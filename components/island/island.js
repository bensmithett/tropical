import React from 'react'

export default function Island ({
  as = 'div',
  hydrateAs,
  component,
  componentProps = {},
  ...islandProps
}) {
  const El = as
  const Component = component
  const hydrationData = JSON.stringify(componentProps)

  return (
    <El
      data-sanblas-hydrate-as={hydrateAs}
      data-sanblas-hydrate-with={hydrationData}
      {...islandProps}
    >
      <Component {...componentProps} />
    </El>
  )
}

export function withIsland (Component, {
  as = 'div',
  islandProps = {},
  hydrateAs
} = {}) {
  hydrateAs = hydrateAs || Component.displayName
  if (!hydrateAs) throw new Error('San Blas: withIsland() requires either Component.displayName or hydrateAs')
  const El = as

  function Hoc (props) {
    const hydrationData = JSON.stringify(props)

    return (
      <El
        data-sanblas-hydrate-as={hydrateAs}
        data-sanblas-hydrate-with={hydrationData}
        {...islandProps}
      >
        <Component {...props} />
      </El>
    )
  }
  Hoc.displayName = `withIsland(${Component.displayName || Component.name || 'UnnamedComponent'})`
  return Hoc
}
