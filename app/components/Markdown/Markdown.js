import React from 'react'
import { useFela } from 'react-fela'

export default function Markdown ({ children }) {
  const { css } = useFela()
  return <div className={css(styles)}>{children}</div>
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

const styles = {
  color: '#fff',

  '> h1': {
    fontSize: '1.7rem',
    marginTop: 0,
    marginBottom: '1rem',

    '@media (min-width: 600px)': {
      fontSize: '2rem',
      marginBottom: '1.5rem',
    }
  },

  '> h2': {
    fontSize: '1.5rem',
    marginTop: '3rem',
    marginBottom: '1rem',

    '@media (min-width: 600px)': {
      fontSize: '1.8rem',
      marginBottom: '1.5rem',
    },

    '> code': {
      fontSize: 'inherit'
    }
  },

  '> h3': {
    fontSize: '1.4rem',
    marginTop: '3rem',
    marginBottom: '1rem',

    '@media (min-width: 600px)': {
      fontSize: '1.6rem',
      marginBottom: '1.5rem'
    },

    '> code': {
      fontSize: 'inherit'
    }
  },

  '> h4': {
    fontSize: '1.3rem',
    marginTop: '2rem',
    marginBottom: '1rem',

    '@media (min-width: 600px)': {
      fontSize: '1.4rem',
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

    '> code': {
      color: '#53ffd4'
    }
  },

  '& code': {
    ...code,
    padding: '3px 5px',
  },

  '& pre': {
    ...code,
    maxWidth: '100%',
    overflow: 'auto',
    padding: '10px'
  }
}

export function Feature ({children}) {
  const {css} = useFela()
  return <p data-feature className={css(featureStyles)}><strong>{children}</strong></p>
}

const featureStyles = {
  fontSize: '1rem',
  marginTop: 0,
  marginBottom: '0.5rem',

  '@media (min-width: 600px)': {
    fontSize: '1.185rem'
  }
}
