import React from 'react'
import DocsMDX from './_docs.mdx'
import Background from '../components/background/background'
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
      <Markdown>
        <DocsMDX />
      </Markdown>
    </Background>
  )
}
