import React from 'react'
import { useFela } from 'react-fela'

export default function Banner () {
  const { css } = useFela()

  return (
    <div className={css(styles.root)}>
      <h1 className={css(styles.heading)}>🏝 San Blas</h1>
      <p className={css(styles.subheading)}>
        A flexible, component-first static site generator.
      </p>
      <p className={css(styles.subSubheading)}>
        Use modern tools to build fast, mostly-just-HTML websites with islands of rich client-side behaviour.
      </p>

      <svg viewBox='0 0 312 292' fill='none' className={css(styles.svg)}>
        <path d="M10 0h292c5.523 0 10 4.477 10 10v272c0 5.523-4.477 10-10 10H10c-5.523 0-10-4.477-10-10V10C0 4.477 4.477 0 10 0zm0 6a4 4 0 0 0-4 4v272a4 4 0 0 0 4 4h292a4 4 0 0 0 4-4V10a4 4 0 0 0-4-4H10z" fill="#fff"/>
        <path stroke="#fff" strokeWidth="6" strokeLinecap="round" d="M24 34h34M74 34h34M124 34h34"/>
        <path stroke="#53ffd4" strokeWidth="6" strokeLinecap="round" d="M265 34h24M265 44h24M265 24h24"/>
        <path stroke="#fff" strokeWidth="6" strokeLinecap="round" d="M64 86h184M64 101h184M64 116h146M64 245h184M64 260h94"/>
        <rect x="64" y="141" width="184" height="77" rx="7" stroke="#53ffd4" strokeWidth="6"/>
        <path d="M172 176.036c2.667 1.54 2.667 5.389 0 6.928l-24.75 14.29c-2.667 1.539-6-.385-6-3.465v-28.578c0-3.08 3.333-5.004 6-3.465l24.75 14.29z" fill="#53ffd4"/>
      </svg>

      <nav className={css(styles.nav)}>
        <a className={css(styles.link)} href='/docs'>Docs</a>
        <a className={css(styles.link)} href='https://github.com/bensmithett/sanblas'>GitHub</a>
      </nav>
    </div>
  )
}

const styles = {
  root: {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',

    '@media (min-width: 600px)': {
      minHeight: '600px',
      maxHeight: '800px'
    }
  },

  heading: {
    color: '#fff',
    fontSize: '2.8rem',
    fontWeight: 700,
    fontFamily: 'Luminari, system-ui, sans-serif',
    margin: '0 0 1rem',
    textShadow: `
      0 1px 0 #883355,
      0 2px 0 #883355,
      0 3px 0 #883355,
      0 4px 0 #883355,
      0 5px 0 #883355,
      0 6px 0 #772255,
      0 7px 0 #772255,
      0 8px 0 #772255,
      0 9px 0 #772255,
      0 10px 0 #772255,
      0 11px 0 #663355,
      0 12px 0 #663355,
      0 13px 0 #663355,
      0 14px 0 #663355,
      0 15px 0 #663355
    `,

    '@media (min-width: 600px)': {
      fontSize: '5rem'
    }
  },

  subheading: {
    color: '#fff',
    fontSize: '1.2rem',
    fontWeight: 700,
    margin: '0 0 1rem',

    '@media (min-width: 600px)': {
      fontSize: '1.5rem'
    }
  },

  subSubheading: {
    color: '#fff',
    fontSize: '1.3rem',
    fontWeight: 400,
    margin: '0 0 2rem'
  },

  svg: {
    maxWidth: '190px',
    marginBottom: '2rem',

    '@media (min-width: 600px)': {
      maxWidth: '250px'
    }
  },

  nav: {
    display: 'flex',
    justifyContent: 'center',
  },

  link: {
    border: '2px solid #53ffd4',
    borderRadius: '4px',
    color: '#53ffd4',
    margin: '0 10px',
    padding: '3px 8px',
    textDecoration: 'none'
  }
}
