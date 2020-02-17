import React from 'react'
import ReactDOM from 'react-dom'
import { RendererProvider } from 'react-fela'

export function registerIslands (config) {
  let islands = {}

  Object.entries(config).forEach(([name, item]) => {
    if (typeof item === 'function') {
      islands[name] = withIsland(name, item)
    } else {
      const { component, ...islandOptions } = item
      islands[name] = withIsland(name, component, islandOptions)
    }
  })

  return islands
}

export function withIsland (componentName, Component, {
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
  Hoc.displayName = `withIsland(${componentName})`
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
