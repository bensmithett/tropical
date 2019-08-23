import React from 'react'
import { useFela } from 'react-fela'
import island from '../../images/island.jpg'

const styles = {
  root: {
    minHeight: '100vh',
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

export default function ExampleComponent ({ alertMessage }) {
  const { css } = useFela()

  return (
    <div className={css(styles.root)}>
      <p>
        Welcome to your{' '}
        <a href='https://github.com/bensmithett/sanblas/'>San Blas</a> site!
      </p>
      <img src={island} alt='San Blas islands' className={css(styles.img)} />
      <p>
        <button
          className={css(styles.button)}
          onClick={() => window.alert(alertMessage)}
        >
          Click me
        </button>
      </p>
    </div>
  )
}

ExampleComponent.displayName = 'ExampleComponent'
