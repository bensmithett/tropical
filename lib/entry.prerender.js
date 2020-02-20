/*
This module's default export (a function called `prerender`) is responsible for creating your HTML files.

This one...

- loops through JS and MDX files in the `pages` directory and renders a HTML file for each.
- creates a JSON Feed
- sets up Fela and Helmet so they can be used in pages and components

...but San Blas doesn't care *how* you generate your HTML files. Change this at your leisure!
*/

import packageJSON from '../package.json'
import React from 'react'
import ReactDOMServer from 'react-dom/server'
import fs from 'fs'
import path from 'path'
import chalk from 'chalk'
import { createRenderer } from 'fela'
import { RendererProvider } from 'react-fela'
import { renderToMarkup } from 'fela-dom'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import { cssReset } from '../components/global_css'
import favicon from '../images/favicon.png'

export default function prerender (manifest, mode) {
  /*
  1. Require every JS and MDX file in the `pages` directory and create a useful collection of 'page' objects.
  (uses Webpack's context module API, see https://webpack.js.org/guides/dependency-management/)
  */
  const pages = []
  const req = require.context('../pages', true, /^(?!.*\/_).*(js|mdx)$/)
  req.keys().forEach(sourceFilePath => {
    const pageModule = req(sourceFilePath)
    const sourceFile = path.parse(sourceFilePath)

    pages.push({
      PageComponent: pageModule.default,
      meta: pageModule.meta,
      urlPath: cleanURLPathForPage(sourceFile)
    })
  })

  /*
  2. Create a collection of blog posts (if you're not building a blog you can ignore this step!)
  A blog must distinguish "posts" from other non-post pages, like your homepage.

  By default we look for a `meta` export like this: { collection: 'posts', date: '2020-11-30' }
  but you could determine "posts" however you like (e.g. they all live in a `posts` directory, etc)
  */
  const posts = collectPosts(pages)
  const pageProps = { posts }
  buildJSONFeedFile(pageProps)


  /*
  3. Build a HTML file for each page
  */
  pages.forEach(({ PageComponent, meta, urlPath }) => {
    buildPageFile({
      PageComponent,
      meta,
      urlPath,
      manifest,
      mode,
      pageProps
    })
  })
}

function collectPosts (pages) {
  return pages
    .filter((page) => page.meta && page.meta.collection === 'posts')
    .sort((a, b) => new Date(b.meta.date) - new Date(a.meta.date))
}

function buildPageFile ({
  PageComponent,
  meta,
  urlPath,
  manifest,
  mode,
  pageProps = {}
}) {
  // 1. Create a shared Fela renderer and Helmet context to be used by the page
  const felaRenderer = createRenderer({
    devMode: mode === 'development'
  })
  cssReset(felaRenderer)
  const helmetContext = {}

  // 2. Render the page's main body HTML
  const bodyHTML = ReactDOMServer.renderToString(
    <RendererProvider renderer={felaRenderer}>
      <HelmetProvider context={helmetContext}>
        <Helmet>
          <title>{meta.title}</title>
          <meta name='description' content={meta.description} />
          <meta name='viewport' content='width=device-width, initial-scale=1' />
          <link rel="alternate" href='/feed.json' title={packageJSON.sanblas.feedTitle} type='application/json' />
          <link rel='icon' href={favicon} />
        </Helmet>
        <PageComponent {...pageProps} />
      </HelmetProvider>
    </RendererProvider>
  )

  // 3. Render the body HTML, plus prerendered Fela styles & Helmet head tags, into the page layout
  const stylesHTML = renderToMarkup(felaRenderer)
  const { helmet } = helmetContext
  const renderedDocument = documentTemplate({
    bodyHTML,
    stylesHTML,
    helmet,
    clientBundlePath: manifest['client.js']
  })

  // 4. Save to an `index.html` file in the correct location.
  const outputDir = path.resolve(__dirname, '../output', `.${urlPath}`)

  if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true })

  const outputFilePath = `${outputDir}/index.html`

  fs.writeFile(outputFilePath, renderedDocument, err => {
    if (err) throw err
    console.log(chalk.green(`🏝  Page built: ${outputFilePath}`))
  })
}

// Get clean URLs by naming all HTML files `index.html` in a folder with the same name as the source file.
// (except source files called `index` - they can be output in place)
function cleanURLPathForPage (sourceFile) {
  return path.join(
    '/',
    sourceFile.dir,
    sourceFile.name === 'index' ? '' : sourceFile.name
  )
}

function documentTemplate ({
  stylesHTML,
  bodyHTML,
  helmet,
  clientBundlePath
}) {
  return `<!doctype html>
<html lang="en">
  <head>
    ${helmet.title.toString()}
    ${helmet.meta.toString()}
    ${helmet.link.toString()}
    ${stylesHTML}
  </head>
  <body>
    ${bodyHTML}
    <script src='${clientBundlePath}'></script>
  </body>
</html>
`
}

function buildJSONFeedFile (pageProps) {
  const { siteURL, feedTitle } = packageJSON.sanblas
  const { posts } = pageProps

  // A minimal JSON Feed (see https://jsonfeed.org/version/1)
  const feed = {
    version: 'https://jsonfeed.org/version/1',
    title: feedTitle,
    home_page_url: siteURL,
    feed_url: `${siteURL}/feed.json`,
    items: posts.map(({ PageComponent, urlPath, meta }) => ({
      id: urlPath,
      url: `${siteURL}${urlPath}`,
      title: meta.title,
      date_published: new Date(meta.date).toISOString(),
      content_text: ReactDOMServer.renderToStaticMarkup(
        // Render with Fela & Helmet providers, just in case any components in the page require them
        // We don't need to do anything with the results though, because we only want the CSS-free body HTML for our feed
        <RendererProvider renderer={createRenderer()}>
          <HelmetProvider context={{}}>
            <PageComponent {...pageProps} />
          </HelmetProvider>
        </RendererProvider>
      )
    }))
  }

  const outputFilePath = path.resolve(__dirname, '../output/feed.json')

  fs.writeFile(outputFilePath, JSON.stringify(feed), err => {
    if (err) throw err
    console.log(chalk.green(`🏝  JSON Feed built: ${outputFilePath}`))
  })
}
