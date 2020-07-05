import React from 'react'
import Background from '../background/background'
import DocsLayout from './docs_layout'

export default { title: 'DocsLayout' }

export const normal = () => (
  <Background wide>
    <DocsLayout>Main area</DocsLayout>
  </Background>
)