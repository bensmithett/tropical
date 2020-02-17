export const meta = {
  title: 'Your San Blas site',
  description: ''
}

import React from 'react'
import { Helmet } from 'react-helmet-async'
import islands from '../components/islands'

const { ExampleComponent } = islands

export default function IndexPage ({ posts }) {
  return (
    <>
      <ExampleComponent alertMessage='An yeel itoe' />
      <h2>Posts</h2>
      {
        posts.map(({meta, urlPath}) => <a href={urlPath}>{meta.title}</a>)
      }
    </>
  )
}
