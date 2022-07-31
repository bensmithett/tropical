import { useMemo } from 'react'
import { createRenderer as createFelaRenderer } from 'fela'
import { RendererProvider as FelaRendererProvider } from 'react-fela'
import cssReset from '../src/cssReset'

export const Provider = ({ children, globalState }) => {
  // Get a fresh Fela renderer when switching to/from iframe in Ladle
  // See https://github.com/tajo/ladle/issues/207
  const doc = getDocument(globalState.story)
  const renderer = useMemo(() => initialiseFelaRenderer(), [doc])

  return (
    <FelaRendererProvider renderer={renderer} targetDocument={doc}>
      {children}
    </FelaRendererProvider>
  )
}

function getDocument(story) {
  const iframe = document.querySelector(`[title='Story ${story}']`)
  return iframe && iframe.contentDocument ? iframe.contentDocument : document
}

function initialiseFelaRenderer() {
  const renderer = createFelaRenderer({ devMode: true })
  cssReset(renderer)
  return renderer
}
