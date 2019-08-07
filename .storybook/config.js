import { configure, addDecorator, addParameters } from '@storybook/react'
import React from 'react'
import {createRenderer} from 'fela'
import {RendererProvider} from 'react-fela'
import cssReset from '../global_css/css_reset'

// automatically import all files ending in *.stories.js
const req = require.context('../components', true, /.stories.js$/)
function loadStories() {
  req.keys().forEach(filename => req(filename))
}

// Setup Fela client runtime
const renderer = createRenderer({devMode: true})
cssReset(renderer)
addDecorator((storyFn) => {
  return <RendererProvider renderer={renderer}>{storyFn()}</RendererProvider>
})

addParameters({
  options: {
    showPanel: false
  }
})

configure(loadStories, module)
