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
        data-tropical-hydrate-as={componentName}
        data-tropical-hydrate-with={hydrationData}
        {...islandProps}
      >
        <Component {...props} />
      </Island>
    )
  }
  Hoc.displayName = `asIsland(${componentName})`
  return Hoc
}

export function hydrateIslands (islands, felaRenderer) {
  document.querySelectorAll('[data-tropical-hydrate-as]').forEach(island => {
    const Component = islands[island.dataset.tropicalHydrateAs]
    const componentProps = JSON.parse(island.dataset.tropicalHydrateWith)
    const element = (
      <RendererProvider renderer={felaRenderer}>
        <Component {...componentProps} />
      </RendererProvider>
    )
    ReactDOM.hydrate(element, island)
  })
}
