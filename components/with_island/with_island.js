import React from 'react'

export default function withIsland (Component, {
  islandTag = 'div',
  islandProps = {},
  hydrateAs
} = {}) {
  hydrateAs = hydrateAs || Component.displayName
  if (!hydrateAs) throw new Error('San Blas: withIsland() requires either Component.displayName or options.hydrateAs')
  const Island = islandTag

  function Hoc (props) {
    const hydrationData = JSON.stringify(props)

    return (
      <Island
        data-sanblas-hydrate-as={hydrateAs}
        data-sanblas-hydrate-with={hydrationData}
        {...islandProps}
      >
        <Component {...props} />
      </Island>
    )
  }
  Hoc.displayName = `withIsland(${Component.displayName || Component.name || 'UnnamedComponent'})`
  return Hoc
}
