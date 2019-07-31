import {html} from 'htm/react'
import Nav from '../components/nav'

export default function Home () {
  return html`
    <header>
      <${Nav} items=${['home', 'about', 'help']} />
    </header>

    <div role='main'>
      <p>Hello world</p>
    </div>
  `
}
