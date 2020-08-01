import React from 'react'
import CodeBlock from './CodeBlock'

export default { title: 'CodeBlock' }

export const JS = () => (
  <CodeBlock className='language-javascript'>
{`const a = doSomething()
const b = new Thing([
  a, b, c
])`}
  </CodeBlock>
)

export const CSS = () => (
  <CodeBlock className='language-css'>
{`.foo {
  color: red;
  background: url('blah.jpg')
}`}
  </CodeBlock>
)
