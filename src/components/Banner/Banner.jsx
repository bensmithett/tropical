import React from 'react'
import { useFela } from 'react-fela'
import { Phone } from './Phone'

export function Banner() {
  const { css } = useFela()

  return (
    <div className={css(styles.root)}>
      <h1 className={css(styles.heading)}>Tropical</h1>
      <p className={css(styles.tagline)}>
        Fast, mostly-just-HTML static sites <br className={css(styles.br)} />
        with <a href='https://jasonformat.com/islands-architecture/'>islands</a> of client-side JS.
      </p>

      <div className={css(styles.middle)}>
        <Phone className={css(styles.svg)} />

        <div className={css(styles.intro)}>
          <p className={css(styles.introP)}>
            <strong>
              A modern static site generator for the <a href='https://jamstack.org/'>JAMStack</a>{' '}
              age without all the complex magic.
            </strong>
          </p>
          <p className={css(styles.introP)}>
            Tropical is just <a href='https://vitejs.dev/'>Vite</a> plus a flexible layer of{' '}
            <strong>familiar, industry-standard tools & conventions</strong> for building{' '}
            fast, component-based static websites with{' '}
            targeted <a href='https://jasonformat.com/islands-architecture/'>islands</a> of client-side JS.
          </p>

          <nav className={css(styles.nav)}>
            <a className={css(styles.link)} href='/docs'>
              Docs
            </a>
            <a className={css(styles.link)} href='https://github.com/bensmithett/tropical'>
              GitHub
            </a>
          </nav>
        </div>
      </div>
    </div>
  )
}

const textShadow = [
  '0 1px 0 #883355',
  '0 2px 0 #883355',
  '0 3px 0 #883355',
  '0 4px 0 #883355',
  '0 5px 0 #883355',
  '0 6px 0 #772255',
  '0 7px 0 #772255',
  '0 8px 0 #772255',
  '0 9px 0 #772255',
  '0 10px 0 #772255',
  '0 11px 0 #663355',
  '0 12px 0 #663355',
  '0 13px 0 #663355',
  '0 14px 0 #663355',
  '0 15px 0 #663355'
].join(',')

const links = {
  '& a': {
    color: '#53ffd4',
    fontWeight: 700,
    textDecoration: 'none'
  }
}

const styles = {
  root: {
    color: '#fff',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',

    '@media (max-width: 599px)': {
      minHeight: '100vh'
    },

    '@media (min-width: 600px)': {
      minHeight: '600px',
      maxHeight: '800px'
    }
  },

  heading: {
    fontWeight: 100,
    fontFamily: '"Lost Island", system-ui, sans-serif',
    fontDisplay: 'block',
    lineHeight: 1,

    textShadow,

    '::before': {
      content: '"🏝"',
      margin: '0 5px 0 -15px'
    },

    '@media (max-width: 599px)': {
      fontSize: '3.2rem'
    },

    '@media (min-width: 600px)': {
      fontSize: '7rem',
      margin: '0 0 2.2rem'
    }
  },

  tagline: {
    fontSize: '1.1rem',
    fontWeight: 700,
    margin: '0 0 2rem',
    ...links,

    '@media (min-width: 600px)': {
      fontSize: '1.5rem',
      margin: '0 0 1rem'
    }
  },

  br: {
    '@media (min-width: 600px)': { display: 'none' }
  },

  svg: {
    '@media (max-width: 599px)': {
      maxWidth: '50%'
    }
  },

  middle: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    gap: '2rem',

    '@media (min-width: 600px)': {
      display: 'grid',
      gap: '40px',
      gridTemplateColumns: '200px 1fr',
      maxWidth: '800px',
      padding: '40px 0 0'
    }
  },

  intro: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',

    '@media (min-width: 600px)': {
      justifyContent: 'center',
      gap: '1.25rem',
      textAlign: 'left'
    }
  },

  introP: {
    fontSize: '0.93rem',
    fontWeight: 400,
    margin: 0,
    ...links,

    '@media (min-width: 600px)': {
      fontSize: '1.3rem'
    }
  },

  nav: {
    display: 'flex',
    gap: '20px',

    '@media (max-width: 599px)': {
      justifyContent: 'center'
    }
  },

  link: {
    border: '2px solid rgba(255, 255, 255, 0.4)',
    borderRadius: '4px',
    color: '#fff',
    fontSize: '0.8rem',
    fontWeight: 700,
    padding: '3px 8px',
    textDecoration: 'none',
    textTransform: 'uppercase',

    '@media (min-width: 600px)': {
      fontSize: '1rem'
    }
  }
}
