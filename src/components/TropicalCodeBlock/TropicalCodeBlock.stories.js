import React from 'react'
import TropicalCodeBlock from './TropicalCodeBlock'

export default { title: 'TropicalCodeBlock' }

export const JS = () => (
  <TropicalCodeBlock className='language-javascript'>
{`const a = doSomething()
const b = new Thing([
  a, b, c
])`}
  </TropicalCodeBlock>
)

export const CSS = () => (
  <TropicalCodeBlock className='language-css'>
{`.foo {
  color: red;
  background: url('blah.jpg')
}`}
  </TropicalCodeBlock>
)
