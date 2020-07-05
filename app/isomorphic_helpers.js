import React from 'react'
import ReactDOM from 'react-dom'
import { RendererProvider } from 'react-fela'

export function asIsland (componentName, Component, {
  islandTag = 'div',
  islandProps = {},
} = {}) {
  const Island = islandTag

  function Hoc (props) {
    const hydrationData = JSON.stringify(props)

    return (
      <Island
        data-sanblas-hydrate-as={componentName}
        data-sanblas-hydrate-with={hydrationData}
        {...islandProps}
      >
        <Component {...props} />
      </Island>
    )
  }
  Hoc.displayName = `asIsland(${componentName})`
  return Hoc
}

export function rehydrateIslands (islands, felaRenderer) {
  document.querySelectorAll('[data-sanblas-hydrate-as]').forEach(island => {
    const Component = islands[island.dataset.sanblasHydrateAs]
    const componentProps = JSON.parse(island.dataset.sanblasHydrateWith)
    const element = (
      <RendererProvider renderer={felaRenderer}>
        <Component {...componentProps} />
      </RendererProvider>
    )
    ReactDOM.hydrate(element, island)
  })
}
