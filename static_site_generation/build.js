import Home from '../pages/home'
import React from 'react'
import ReactDOMServer from 'react-dom/server'
import fs from 'fs'
import { createRenderer } from 'fela'
import {RendererProvider} from 'react-fela'
import {renderToMarkup} from 'fela-dom'
import defaultLayout from '../layouts/default_layout'

const renderer = createRenderer({
  devMode: true
})

function buildProduction () {
  const bodyHTML = ReactDOMServer.renderToString(
    <RendererProvider renderer={renderer}>
      <Home />
    </RendererProvider>
  )
  const stylesHTML = renderToMarkup(renderer)
  const renderedDocument = defaultLayout({ bodyHTML, stylesHTML })

  fs.writeFile(`${process.cwd()}/output/index.html`, renderedDocument, (err) => {
    if (err) throw err
    console.log('done!')
  })
}

console.log('building page')
buildProduction()

