import React from 'react'
import ReactDOM from 'react-dom'
import {createRenderer} from 'fela'
import {rehydrate} from 'fela-dom'
import {RendererProvider} from 'react-fela'
import hydratableComponents from './hydratable_components'

// Rehydrate fela
const renderer = createRenderer()
rehydrate(renderer)

// Rehydrate sanblas components
document
  .querySelectorAll('[data-sanblas-hydrate-as]')
  .forEach((island) => {
    const Component = hydratableComponents[island.dataset.sanblasHydrateAs]
    const componentProps = JSON.parse(island.dataset.sanblasHydrateWith)
    const element = (
      <RendererProvider renderer={renderer}>
        <Component {...componentProps} />
      </RendererProvider>
    )
    ReactDOM.hydrate(element, island)
  })
