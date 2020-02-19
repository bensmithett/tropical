import React, { useState, useEffect } from 'react'
import { useFela } from 'react-fela'
import island from '../../images/island.jpg'

const styles = {
  root: {
    minHeight: '60vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },

  img: {
    borderRadius: '4px',
    transition: 'transform 0.1s ease-in-out',
    maxWidth: '700px',

    ':hover': {
      transform: 'scale(1.05)'
    }
  },

  button: {
    fontSize: 'inherit'
  }
}

export default function WelcomeBanner ({ alertMessage }) {
  const { css } = useFela()
  const [ isMounted, setMounted ] = useState(false)

  useEffect(() => { setMounted(true) }, [])

  return (
    <div className={css(styles.root)}>
      <p>
        Welcome to your <a href='https://github.com/bensmithett/sanblas/'>San Blas</a> site!
      </p>
      <img src={island} alt='San Blas islands' className={css(styles.img)} />
      <p>
        <button
          className={css(styles.button)}
          onClick={() => window.alert(alertMessage)}
          disabled={!isMounted}
        >
          Click me
        </button>
      </p>
    </div>
  )
}
