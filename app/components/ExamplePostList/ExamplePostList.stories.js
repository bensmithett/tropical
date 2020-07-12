import React from 'react'
import ExamplePostList from './ExamplePostList'

export default { title: 'ExamplePostList' }

export const basic = () => (
  <ExamplePostList
    posts={[
      {
        urlPath: 'post-1',
        meta: { title: 'Post 1' }
      },
      {
        urlPath: 'post-2',
        meta: { title: 'Post 2' }
      }
    ]}
  />
)
