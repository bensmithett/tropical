import React from 'react'
import { createRenderer } from 'fela'
import { RendererProvider } from 'react-fela'
import { hydrateIslands } from 'tropical-islands'
import { TropicalPhotoButton } from './components/TropicalPhotoButton'

function Providers({ children }) {
  return <RendererProvider renderer={createRenderer()}>{children}</RendererProvider>
}

console.log('hydrating...')
hydrateIslands({ TropicalPhotoButton }, Providers)
console.log('hydrated!')
