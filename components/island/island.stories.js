import React from 'react'
import {storiesOf} from '@storybook/react'
import Island from './island'

function TestComponent ({someProp}) {
  return <b>{someProp}</b>
}

storiesOf('Island', module)
  .add('default', () => (
    <Island
      hydrateAs='TestComponent'
      component={TestComponent}
      componentProps={{
        someProp: 'some value'
      }}
    />
  ))
  .add('custom island element', () => (
    <Island
      as='p'
      style={{ border: '3px dashed chartreuse' }}
      hydrateAs='TestComponent'
      component={TestComponent}
      componentProps={{
        someProp: 'some value'
      }}
    />
  ))
