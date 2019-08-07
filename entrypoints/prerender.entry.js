/*
This build script loops through React components in the `pages` directory 
and renders each to a HTML file, incorporating:
- styles from Fela
- title & meta elements from React Helmet Async

If you need to do other processing like parsing Markdown or generating RSS feeds,
your build script will look different. (TODO: add some recipes for doing that stuff!)
*/

import React from 'react'
import ReactDOMServer from 'react-dom/server'
import fs from 'fs'
import path from 'path'
import { createRenderer } from 'fela'
import { RendererProvider } from 'react-fela'
import { renderToMarkup } from 'fela-dom'
import { HelmetProvider } from 'react-helmet-async'
import defaultLayout from '../layouts/default_layout'
import cssReset from '../global_css/css_reset.js'

function buildPage (PageComponent, outputFilename) {
  const felaRenderer = createRenderer({
    devMode: true
  })
  cssReset(felaRenderer)

  const helmetContext = {}

  const bodyHTML = ReactDOMServer.renderToString(
    <RendererProvider renderer={felaRenderer}>
      <HelmetProvider context={helmetContext}>
        <PageComponent />
      </HelmetProvider>
    </RendererProvider>
  )

  const stylesHTML = renderToMarkup(felaRenderer)
  const { helmet } = helmetContext
  const renderedDocument = defaultLayout({ bodyHTML, stylesHTML, helmet })

  const outputDir = path.resolve(__dirname, '../prerender')
  if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir)
  
  fs.writeFile(`${outputDir}${outputFilename}.html`, renderedDocument, (err) => {
    if (err) throw err
    console.log(`page built: ${outputDir}${outputFilename}.html`)
  })
}

const req = require.context('../pages', true, /.js$/)
req.keys().forEach(filename => {
  const PageComponent = req(filename).default

  const outputFilename = filename.substring(
    filename.indexOf('./') + 1, 
    filename.lastIndexOf('.js')
  )

  buildPage(PageComponent, outputFilename)
})
