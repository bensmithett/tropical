import React from 'react'
import { TropicalCodeBlock } from './TropicalCodeBlock'

export default {
  title: 'TropicalCodeBlock',
  component: TropicalCodeBlock
}

const Template = (args) => <TropicalCodeBlock {...args} />

export const JS = Template.bind({})
JS.args = {
  children: `
function relax() {
  console.log('Welcome to Tropical')
}
  `,
  language: 'javascript'
}

export const JSX = Template.bind({})
JSX.args = {
  children: `
function Relax ({ drink = 'Singapore Sling' }) {
  return (
    <div>
      <Cocktail drink={drink} />
    </div>
  )
}
  `,
  language: 'jsx'
}
