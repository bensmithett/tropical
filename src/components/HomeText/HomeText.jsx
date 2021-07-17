import React from 'react'
import { useFela } from 'react-fela'

export function HomeText({ children }) {
  const { css } = useFela()

  return (
    <div
      className={css({
        color: '#fff',
        margin: '0 auto',
        maxWidth: '42rem',

        '> h2': {
          fontSize: '1.5rem',
          marginTop: '3rem',
          marginBottom: '1rem',

          '@media (min-width: 600px)': {
            fontSize: '1.8rem',
            marginBottom: '1.5rem'
          },

          '> code': {
            fontSize: 'inherit'
          }
        },

        '> p:not([data-feature])': {
          ...blockMargins,
          ...bodyText
        },

        '> ul': {
          ...blockMargins,
          ...bodyText,
          paddingLeft: '1em',

          '& ul': {
            paddingLeft: '1.5em'
          }
        },

        '& a': {
          color: '#53ffd4',
          fontWeight: 700,
          textDecoration: 'none'
        },

        '& em': {
          fontStyle: 'normal',
          textDecoration: 'underline'
        }
      })}
    >
      {children}
    </div>
  )
}

const blockMargins = {
  marginTop: 0,
  marginBottom: '1.5rem'
}

const bodyText = {
  '@media (min-width: 600px)': {
    fontSize: '1.185rem'
  }
}

const code = {
  backgroundColor: '#282923',
  borderRadius: '4px',
  color: '#FC9721',
  fontFamily: 'Andale Mono, monospace',
  fontSize: '0.9rem',

  '@media (min-width: 600px)': {
    fontSize: '1.1rem'
  }
}