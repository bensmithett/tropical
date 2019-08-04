import React from 'react'
import {storiesOf} from '@storybook/react'
import ExampleComponent from './example_component'

storiesOf('ExampleComponent', module)
  .add('default', () => <ExampleComponent alertMessage={'An yeel itoe'} />)
