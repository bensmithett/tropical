import React from 'react'
import { useFela } from 'react-fela'
import image from '../TropicalPhotoButton/gunayala.jpg'

export function Background({ children }) {
  const { css } = useFela()

  return (
    <div
      className={css({
        backgroundAttachment: 'fixed',
        backgroundImage: `linear-gradient(to bottom, ${[
          'rgba(102, 51, 85, 0.85)',
          'rgba(119, 34, 85, 0.89)',
          'rgba(136, 51, 85, 0.95)',
          'rgba(170, 51, 85, 0.99)'
        ].join(',')}), url('${image}')`,
        backgroundPosition: 'center center',
        backgroundSize: 'cover',
        minHeight: '100vh',
        paddingBottom: '30px'
      })}
    >
      <div
        className={css({
          margin: '0 auto',
          maxWidth: '42rem',
          padding: '0 1rem'
        })}
      >
        {children}
      </div>
    </div>
  )
}
