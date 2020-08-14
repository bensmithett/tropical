import React from 'react'
import { createRenderer } from 'fela'
import { RendererProvider } from 'react-fela'
import cssReset from '../app/components/cssReset'

// Setup Fela client runtime
const renderer = createRenderer({ devMode: true })
cssReset(renderer)
export const decorators = [
  (storyFn) => <RendererProvider renderer={renderer}>{storyFn()}</RendererProvider>
]
