import React from 'react'
import Markdown, {Feature} from './markdown'
import Background from '../background/background'

export default { title: 'Markdown' }

export const normal = () => (
  <Background>
    <Markdown>
      <h2>Heading level 2</h2>
      <p>
        Some text <code>some inline code</code> with <a href='https://en.wikipedia.org/wiki/Guna_Yala'>a link</a>.
      </p>

      <ul>
        <li>A list item with <a href='#'>a link</a></li>
        <li>A list item with <code>some inline code</code></li>
        <li>
          A list item with
          <ul>
            <li>a nested</li>
            <li>list</li>
          </ul>
        </li>
        <li>Another list item</li>
      </ul>

      <Feature>Feature paragraph</Feature>
      <p>Regular paragraph</p>
    </Markdown>
  </Background>
)
