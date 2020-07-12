import React from 'react'
import Background from '../Background/Background'
import DocsWrapper from './DocsWrapper'

export default { title: 'DocsWrapper' }

export const normal = () => (
  <Background wide>
    <DocsWrapper>Main area</DocsWrapper>
  </Background>
)