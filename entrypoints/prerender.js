/*
The default function exported by this module is responsible for creating your HTML pages.
That's all! Your prerender function can do anything you like!

This one loops through React components in the `pages` directory and renders a HTML file for each.

Yours might be different, especially if you want to do additional processing
(e.g. parsing Markdown or generating RSS feeds)

How you do that is up to you, which means you can take advantage of an entire existing
ecosystem of JS tools for those tasks!
*/

import React from 'react'
import ReactDOMServer from 'react-dom/server'
import fs from 'fs'
import path from 'path'
import chalk from 'chalk'
import { createRenderer } from 'fela'
import { RendererProvider } from 'react-fela'
import { renderToMarkup } from 'fela-dom'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import defaultLayout from '../layouts/default_layout'
import cssReset from '../global_css/css_reset.js'
import favicon from '../images/favicon.png'

export default function prerender (manifest, mode) {
  // First, let's require every JS file in the `pages` directory and create a useful collection of pages
  // using Webpack's context module API: https://webpack.js.org/guides/dependency-management/
  const pages = []

  const req = require.context('../pages', true, /.mdx$/)
  req.keys().forEach(sourceFilePath => {
    const pageModule = req(sourceFilePath)
    const sourceFile = path.parse(sourceFilePath)

    pages.push({
      Component: pageModule.default,
      meta: pageModule.meta,
      urlPath: getURLPath(sourceFile),
      sourceFile
    })
  })

  // Now, let's build every page we found that is part of the "posts" collection
  // (and keep track of all the "posts" pages in an array. We'll use it later to build a post
  // archive on the homepage, as well as an RSS feed)
  const posts = []
  pages.forEach(page => {
    if (page.meta.collection === 'posts') {
      posts.push(page)
      buildPage({
        ...page,
        manifest,
        mode
      })
    }
  })

  // Now we have a collection of all our posts. Let's sort them by date, most recent first.
  posts.sort((a, b) => new Date(b.meta.date) - new Date(a.meta.date))

  // Now we have our archive of all posts. Let's build the homepage.
  const homepage = pages.find(
    page => page.sourceFile.dir === '.' && page.sourceFile.name === 'index'
  )
  buildPage({
    ...homepage,
    manifest,
    mode,
    // We've updated buildPage to accept an optional pageProps param, so we can pass the collection of posts into
    // the homepage component. That means they'll be accessible in our MDX file via a global `props.posts`.
    pageProps: { posts }
  })

  // Finally, let's build our JSON feed:
  buildJSONFeed(posts)
}

function getURLPath (sourceFile) {
  // We'll get clean URLs by naming all HTML files `index.html` in a folder with the source filename
  // (except source files called `index` - they can be output in place)
  return path.join(
    '/',
    sourceFile.dir,
    sourceFile.name === 'index' ? '' : sourceFile.name
  )
}

function buildPage ({
  Component,
  meta,
  urlPath,
  sourceFile,
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
          <link rel='icon' href={favicon} />
          <link rel="alternate" href='/feed.json' title='My JSON Feed' type='application/json' />
          <meta name='viewport' content='width=device-width, initial-scale=1' />
        </Helmet>
        <Component {...pageProps} />
      </HelmetProvider>
    </RendererProvider>
  )

  // 3. Render the body HTML, plus prerendered Fela styles & Helmet head tags, into the page layout
  const stylesHTML = renderToMarkup(felaRenderer)
  const { helmet } = helmetContext
  const renderedDocument = defaultLayout({
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

function buildJSONFeed (posts) {
  const siteURL = 'https://example.org'

  // A minimal JSON Feed
  // See https://jsonfeed.org/version/1 to extend it
  const feed = {
    version: 'https://jsonfeed.org/version/1',
    title: 'My Example Feed',
    home_page_url: siteURL,
    feed_url: `${siteURL}/feed.json`,
    items: posts.map(({ Component, urlPath, meta }) => ({
      id: urlPath,
      url: `${siteURL}${urlPath}`,
      title: meta.title,
      date_published: new Date(meta.date).toISOString(),
      content_text: ReactDOMServer.renderToStaticMarkup(
        // Render with Fela & Helmet providers, just in case any components in the page require them
        // We don't need to do anything with the results though, because we only want the CSS-free body HTML for our feed
        <RendererProvider renderer={createRenderer()}>
          <HelmetProvider context={{}}>
            <Component />
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
