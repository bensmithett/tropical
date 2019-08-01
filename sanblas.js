import React from 'react'

export function Island ({
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
