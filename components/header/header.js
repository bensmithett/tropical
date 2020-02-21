import React from 'react'
import { useFela } from 'react-fela'

export default function Header () {
  const { css } = useFela()
  const linkClass = css(styles.link)

  return (
    <nav className={css(styles.root)}>
      <a className={linkClass} href='/'>
        Home
      </a>
      <a className={linkClass} href='/docs'>
        Docs
      </a>
      <a className={linkClass} href='https://github.com/bensmithett/sanblas'>
        GitHub
      </a>
    </nav>
  )
}

const styles = {
  root: {
    display: 'flex',
    justifyContent: 'center',
    padding: '20px 0 20px'
  },
  link: {
    color: '#fff',
    fontWeight: 600,
    fontSize: '0.75rem',
    margin: '0 20px',
    textDecoration: 'none',
    textTransform: 'uppercase',

    ':hover': {
      textDecoration: 'underline'
    }
  }
}
