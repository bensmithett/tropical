import React from 'react'
import { TropicalCodeBlock } from './TropicalCodeBlock'

export default {
  title: 'TropicalCodeBlock',
  component: TropicalCodeBlock
}

const Template = (args) => <TropicalCodeBlock {...args} />

export const JS = Template.bind({})
JS.args = {
  children: `function foo() { console.log('hi') }`,
  className: 'language-javascript'
}
