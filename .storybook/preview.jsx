export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  docs: {
    source: {
      excludeDecorators: true,
    },
  }
}

import React from 'react'
import { createRenderer } from 'fela'
import { RendererProvider } from 'react-fela'
import cssReset from '../src/cssReset'

const renderer = createRenderer({ devMode: true })
cssReset(renderer)
export const decorators = [
  (storyFn) => <RendererProvider renderer={renderer}>{storyFn()}</RendererProvider>
]
