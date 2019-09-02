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
  const req = require.context('../pages', true, /.js$/)
  req.keys().forEach(sourceFilePath => {    
    pages.push({
      Component: req(sourceFilePath).default,
      sourceFile: path.parse(sourceFilePath)
    })
  })

  // Now let's build each page
  pages.forEach((page) => {
    buildPage({
      PageComponent: page.Component,
      sourceFile: page.sourceFile,
      manifest,
      mode
    })
  })
}

function buildPage ({
  PageComponent,
  sourceFile,
  manifest,
  mode
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
          <link rel='icon' href={favicon} />
          <meta name='viewport' content='width=device-width, initial-scale=1' />
        </Helmet>
        <PageComponent />
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

  // 4. Save to a HTML file
  // If a page is called `index`, we'll save its HTML file in place.
  // Otherwise we'll create a folder at the page's filename and put an `index.html` in it, so we get clean URLs.
  const outputDir = path.resolve(
    __dirname,
    '../output',
    sourceFile.dir,
    sourceFile.name === 'index' ? '' : sourceFile.name
  )

  if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, {recursive: true})
  
  const outputFilePath = `${outputDir}/index.html`

  fs.writeFile(outputFilePath, renderedDocument, (err) => {
    if (err) throw err
    console.log(chalk.green(`🏝  Page built: ${outputFilePath}`))
  })
}
