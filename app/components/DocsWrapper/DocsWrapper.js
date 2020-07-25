import React from 'react'
import { useFela } from 'react-fela'

const pages = {
  'Tropical Documentation': '/docs',
  'Quick start': '/docs/quick-start',
  'Global configuration': '/docs/global-configuration',
  'Pages': '/docs/pages',
  'Components': '/docs/components',
  'Layouts': '/docs/layouts',
  'Core Files': '/docs/core-files'
}

export default function DocsWrapper ({ children }) {
  const { css } = useFela()

  const list = css({
    fontSize: '0.92rem',
    listStyle: 'none',
    margin: 0,
    padding: '0 0 0 10px',
    '> li > a': {
      color: '#fff'
    }
  })

  return (
    <div
      className={css({
        color: '#fff',
        padding: '10px',
        position: 'relative',

        '@media (min-width: 600px)': {
          display: 'grid',
          gridTemplateColumns: '200px 1fr',
          gridGap: '20px'
        }
      })}
    >
      <nav
        className={css({
          '@media (max-width: 599px)': {
            marginBottom: '30px'
          }
        })}
      >
        <ul className={list}>
          {
            Object.keys(pages).map((title) => <li key={title}><a href={pages[title]}>{title}</a></li>)
          }
        </ul>
      </nav>

      <div>{children}</div>
    </div>
  )
}
