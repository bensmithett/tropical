import React, { useState, useEffect } from 'react'
import { useFela } from 'react-fela'
import image from './gunayala.jpg'

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

export default function ExampleComponent ({ alertMessage }) {
  const { css } = useFela()
  const [ isMounted, setMounted ] = useState(false)

  useEffect(() => { setMounted(true) }, [])

  return (
    <div className={css(styles.root)}>
      <p>
        Welcome to your <a href='https://tropical.js.org'>Tropical</a> site!
      </p>
      <img src={image} alt='Guna Yala, Panama' className={css(styles.img)} />
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

// Remember, by default a component is only prerendered.
// Use a version wrapped with the asIsland() helper to enable hydration in the browser.
import { asIsland } from '../../hydrationHelpers'
export const ExampleComponentIsland = asIsland('ExampleComponent', ExampleComponent)
