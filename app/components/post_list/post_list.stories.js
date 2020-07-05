import React from 'react'
import PostList from './post_list'

export default { title: 'PostList' }

export const basic = () => (
  <PostList
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
