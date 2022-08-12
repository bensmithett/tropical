/*
This is a silly example component that demonstrates:

- How to reference assets like images
- How to style elements within a component using Fela
- Client-side behaviour like event handlers and useEffect

Remember, Tropical pages are only server-rendered by default.
If your component has client-side behaviour like this, you'll need to
opt it (or a parent component) into hydration.
See https://tropical.js.org/docs/browser-js
*/

import { useState, useEffect } from 'react'
import { useFela } from 'react-fela'
import image from '../tropical/gunayala.jpg'

export function ExampleComponent({ children, alertMessage }) {
  const { css } = useFela()
  const [isMounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  return (
    <button
      disabled={!isMounted}
      onClick={() => window.alert(alertMessage)}
      className={css({
        background: `url(${image})`,
        backgroundAttachment: 'cover',
        backgroundPosition: 'center center',
        border: 'none',
        borderRadius: '4px',
        color: 'chartreuse',
        cursor: 'pointer',
        fontFamily: `"Comic Sans MS", "Comic Sans", cursive`,
        fontSize: '2rem',
        marginRight: '5px',
        padding: '30px 70px',
        textShadow: '2px 2px 4px #000',

        '&[disabled]': {
          cursor: 'not-allowed',
          filter: 'grayscale(100%)'
        },

        '&:hover:not([disabled])': {
          color: 'hotpink'
        }
      })}
    >
      {children}
    </button>
  )
}
