import React from 'react'
import DocsMDX from './_docs.mdx'
import Background from '../components/background/background'
import DocsLayout from '../components/docs_layout/docs_layout'
import Header from '../components/header/header'
import Markdown from '../components/markdown/markdown'

export const meta = {
  title: 'Documentation | San Blas',
  description: 'Documentation for San Blas - a flexible, component-first static site generator.'
}

export default function Docs () {
  return (
    <Background wide>
      <Header />
      <DocsLayout>
        <Markdown>
          <DocsMDX />
        </Markdown>
      </DocsLayout>
    </Background>
  )
}
