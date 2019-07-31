import {html} from 'htm/react'
import {useFela} from 'react-fela'

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

  return html`
    <nav className=${css(styles.nav)}>
      ${items.map((item) => html`
        <a
          href=${item}
          key=${item}
          className=${css(styles.item)}
        >
          ${item}
        </a>
      `)}
    </nav>
  `
}
