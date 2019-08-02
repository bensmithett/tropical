import React from 'react'
import {useFela} from 'react-fela'
import bull from '../static/bull.png'

const styles = {
  nav: {
    backgroundColor: 'blue',
    padding: 20,
    ':hover': {
      backgroundColor: 'red'
    }
  },

  item: {
    backgroundColor: 'red',
    padding: 10
  }
}

export default function Nav ({items}) {
  const {css} = useFela()

  return (
    <nav className={css(styles.nav)}>
      <img src={bull} />
      {items.map((item) => (
        <a
          href={'#' + item}
          key={item}
          className={css(styles.item)}
          onClick={() => window.alert(item)}
        >
          {item}
        </a>
      ))}
    </nav>
  )
}
