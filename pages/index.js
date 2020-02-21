import React from 'react'
import IndexMDX from './_index.mdx'
import Background from '../components/background/background'
import Banner from '../components/banner/banner'
import Markdown from '../components/markdown/markdown'

export const meta = {
  title: 'San Blas',
  description: 'A flexible, component-first static site generator. Use modern tools to build fast, mostly-just-HTML websites with islands of rich client-side behaviour.'
}

export default function Index () {
  return (
    <Background>
      <Banner />
      <Markdown>
        <IndexMDX />
      </Markdown>
    </Background>
  )
}
