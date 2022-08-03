import React, { useState } from 'react'
import { useFela } from 'react-fela'

export function DocsLayout({ nav, page, title }) {
  const { css } = useFela()
  const [open, setOpen] = useState(false)

  return (
    <div className={css({ position: 'relative' })}>
      <nav
        className={css({
          alignItems: 'center',
          backgroundColor: '#fff',
          backgroundImage: `linear-gradient(to bottom, ${[
            'rgb(102, 51, 85)',
            'rgb(119, 34, 85)',
            'rgb(136, 51, 85)',
            'rgb(170, 51, 85)'
          ].join(',')})`,
          display: 'flex',
          height: headerHeight,
          justifyContent: 'center',
          position: 'sticky',
          top: 0,
          zIndex: 3
        })}
      >
        {[
          ['/', '🏝'],
          ['/docs/', 'Docs'],
          ['https://github.com/bensmithett/tropical', 'GitHub']
        ].map(([url, label]) => (
          <a
            className={css({
              color: '#fff',
              fontWeight: 600,
              fontSize: '0.75rem',
              margin: '0 20px',
              textDecoration: 'none',
              textTransform: 'uppercase',

              '@media (max-width: 900px)': {
                margin: '0 10px'
              }
            })}
            href={url}
            key={url}
          >
            {label}
          </a>
        ))}

        <button
          className={css({
            background: 'none',
            border: 'none',
            height: '25px',
            width: '25px',
            padding: 0,
            cursor: 'pointer',
            marginLeft: 'auto',
            marginRight: '10px',

            '@media (min-width: 901px)': {
              display: 'none'
            }
          })}
          onClick={() => setOpen(!open)}
          data-burger-control
        >
          {burger}
        </button>
      </nav>
      <nav
        className={css({
          background: '#fff',
          padding: '20px',
          position: 'fixed',
          top: headerHeight,
          left: 0,
          bottom: 0,
          overflow: 'auto',
          zIndex: 2,

          '@media (max-width: 900px)': {
            right: 0,

            '&[data-burger-target="closed"]': {
              display: 'none'
            },

            '&[data-burger-target="open"]': {
              display: 'block'
            }
          },

          '@media (min-width: 901px)': {
            width: navWidth
          },

          '> ul': {
            listStyle: 'none',
            margin: 0,
            padding: 0,

            '> li': {
              marginBottom: '5px'
            }
          }
        })}
        data-burger-target='closed'
      >
        {nav}
      </nav>
      <main
        className={css({
          maxWidth: '60rem',
          padding: '0 20px',
          position: 'relative',
          zIndex: 1,

          '> hr': {
            border: 0,
            borderTop: '2px solid rgb(170, 51, 85)'
          },

          '& a': {
            color: 'rgb(170, 51, 85)'
          },

          '& code:not(pre > code)': {
            background: '#eee',
            borderRadius: '3px',
            fontSize: '0.85em',
            padding: '3px'
          },

          '@media (min-width: 901px)': {
            marginLeft: navWidth
          }
        })}
      >
        <h1>{title}</h1>
        {page}
      </main>
    </div>
  )
}

const headerHeight = '2.5rem'
const navWidth = '20rem'
const burger = (
  <svg viewBox='0 0 100 80' width='25' height='25' fill='#fff'>
    <title>Menu</title>
    <rect width='100' height='17'></rect>
    <rect y='30' width='100' height='17'></rect>
    <rect y='60' width='100' height='17'></rect>
  </svg>
)
