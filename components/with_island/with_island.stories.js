import React from 'react'
import { storiesOf } from '@storybook/react'
import withIsland from './with_island'

function TestComponent ({ label }) {
  return <b>{label}</b>
}
TestComponent.displayName = 'TestComponent'

storiesOf('withIsland', module)
  .add('default', () => {
    const TestComponentIsland = withIsland(TestComponent)
    return <TestComponentIsland label='Hello' />
  })
  .add('custom options', () => {
    const TestComponentIsland = withIsland(TestComponent, {
      islandTag: 'p',
      islandProps: {
        style: { border: '3px dotted fuchsia' }
      },
      hydrateAs: 'AnotherComponentName'
    })

    return <TestComponentIsland label='Hello' />
  })
