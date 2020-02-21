import React from 'react'
import { useFela } from 'react-fela'

export default function PostList ({ posts }) {
  const { css } = useFela()

  return (
    <div className={css({ textAlign: 'center' })}>
      <h2>Posts</h2>
      <ul className={css({ padding: 0 })}>
        {posts.map(({ meta, urlPath }) => (
          <li key={urlPath}>
            <a href={urlPath}>{meta.title}</a>
          </li>
        ))}
      </ul>
    </div>
  )
}
