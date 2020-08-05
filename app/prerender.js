/*
The prerender function exported by this module builds your static site from the source in `pages`.
Make it your own! You could alter this function to:
- Generate a sitemap or XML RSS feed
- Remove the JSON Feed if you don't need it
- Build new pages based on different metadata (e.g. tag or date-based archive pages)
*/

import packageJSON from '../package.json'
import React, { Fragment } from 'react'
import ReactDOMServer from 'react-dom/server'
import fs from 'fs'
import path from 'path'
import chalk from 'chalk'
import { createRenderer } from 'fela'
import { RendererProvider } from 'react-fela'
import { renderToMarkup } from 'fela-dom'
import { Helmet } from 'react-helmet'
import { MDXProvider } from '@mdx-js/react'
import dayjs from 'dayjs'
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'
dayjs.extend(isSameOrBefore)
import cssReset from './components/cssReset'
import DefaultLayout from './layouts/DefaultLayout'
import CodeBlock from './components/CodeBlock/CodeBlock'

export default function prerender(manifest, mode) {
  /*
  1. Require every JS and MDX file in the `pages` directory and create a useful collection of 'page' objects.
  (uses Webpack's context module API, see https://webpack.js.org/guides/dependency-management/)
  */
  const pages = []
  const req = require.context('./pages', true, /^(?!.*\/_).*(js|mdx)$/)
  req.keys().forEach((sourceFilePath) => {
    const pageModule = req(sourceFilePath)
    const sourceFile = path.parse(sourceFilePath)

    pages.push({
      PageComponent: pageModule.default,
      meta: pageModule.meta,
      urlPath: cleanURLPathForPage(sourceFile)
    })
  })

  /*
  2. Gather collections based on the meta.collection exported by each page.
  We'll pass these collections to each page in step 4 below (so you can do things like list your blog posts).
  */
  const collections = gatherCollections(pages)
  const pageProps = { collections }

  /*
  3. Build a JSON Feed for the feedCollection specified package.json.
  */
  buildJSONFeedFile(pageProps)

  /*
  4. Build a HTML file for each page
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

/*
That's the gist of your prerender function!
Read on to understand (or change!) some of the details involved in each step.
*/

function gatherCollections(pages) {
  const collections = pages.reduce((acc, page) => {
    if (page.meta.collection) {
      if (!acc[page.meta.collection]) acc[page.meta.collection] = []
      acc[page.meta.collection].push(page)
    }
    return acc
  }, {})

  Object.keys(collections).forEach((collection) => {
    collections[collection].sort((a, b) => {
      if (a.meta.date && b.meta.date) {
        return dayjs(a.meta.date).isSameOrBefore(b.meta.date) ? 1 : -1
      } else {
        return 0
      }
    })
  })

  return collections
}

function buildPageFile({ PageComponent, meta, urlPath, manifest, mode, pageProps = {} }) {
  // 1. Create a Fela renderer to be provided for components in the page
  const felaRenderer = createRenderer({
    devMode: mode === 'development'
  })
  cssReset(felaRenderer)

  // 2. Render the page body HTML, wrapped in provider components that provide:
  //    - Fela renderer
  //    - Custom MDX component to add syntax highlighting to fenced code blocks
  if (!meta) throw new Error(`Page ${urlPath} does not export a meta object`)
  const Layout = meta.Layout || DefaultLayout
  const bodyHTML = ReactDOMServer.renderToString(
    <RendererProvider renderer={felaRenderer}>
      <MDXProvider
        components={{
          pre: (props) => <div {...props} />,
          code: CodeBlock
        }}
      >
        <Layout meta={meta}>
          <PageComponent {...pageProps} />
        </Layout>
      </MDXProvider>
    </RendererProvider>
  )

  // 3. Render the body HTML into the document template, along with prerendered Fela styles & Helmet-managed stuff
  const stylesHTML = renderToMarkup(felaRenderer)
  const helmet = Helmet.renderStatic()
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

  fs.writeFile(outputFilePath, renderedDocument, (err) => {
    if (err) throw err
    console.log(chalk.green(`🏝  Page built: ${outputFilePath}`))
  })
}

function cleanURLPathForPage(sourceFile) {
  // Get clean URLs by naming all HTML files `index.html` in a folder with the same name as the source file.
  // (except source files called `index` - they can be output in place)
  return path.join('/', sourceFile.dir, sourceFile.name === 'index' ? '' : sourceFile.name)
}

function buildJSONFeedFile(pageProps) {
  const { siteURL, feedTitle, feedCollection } = packageJSON.tropical
  const items = pageProps.collections[feedCollection] || []

  // A minimal JSON Feed (see https://jsonfeed.org/version/1)
  const feed = {
    version: 'https://jsonfeed.org/version/1',
    title: feedTitle,
    home_page_url: siteURL,
    feed_url: `${siteURL}/feed.json`,
    items: items
      .filter(({ meta }) => meta.date && dayjs(meta.date).isValid())
      .map(({ PageComponent, urlPath, meta }) => ({
        id: urlPath,
        url: `${siteURL}${urlPath}`,
        title: meta.title,
        date_published: dayjs(meta.date).toISOString(),
        content_text: ReactDOMServer.renderToStaticMarkup(
          // Render with Fela, just in case any components in the page require it
          // We don't need to do anything with the results though, because we only want the CSS-free body HTML for our feed
          <RendererProvider renderer={createRenderer()}>
            <PageComponent {...pageProps} />
          </RendererProvider>
        )
      }))
  }

  const outputFilePath = path.resolve(__dirname, '../output/feed.json')

  fs.writeFile(outputFilePath, JSON.stringify(feed), (err) => {
    if (err) throw err
    console.log(chalk.green(`🏝  JSON Feed built: ${outputFilePath}`))
  })
}

function documentTemplate({ stylesHTML, bodyHTML, helmet, clientBundlePath }) {
  return `<!doctype html>
<html ${helmet.htmlAttributes.toString()}>
  <head>
    ${helmet.title.toString()}
    ${helmet.meta.toString()}
    ${helmet.link.toString()}
    ${stylesHTML}
  </head>
  <body ${helmet.bodyAttributes.toString()}>
    ${bodyHTML}
    <script src='${clientBundlePath}'></script>
  </body>
</html>
  `
}

// By default prism-react-renderer only includes a subset of the languages Prism supports
// https://github.com/FormidableLabs/prism-react-renderer#faq
// Uncomment this to enable syntax highlighting for additional languages;
// import Prism from 'prism-react-renderer/prism'
// ;(typeof global !== 'undefined' ? global : window).Prism = Prism
// require('prismjs/components/prism-ruby')
