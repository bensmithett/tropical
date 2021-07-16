import React from 'react'
import { Background } from './Background'

export default {
  title: 'Background',
  component: Background
}

const Template = (args) => <Background {...args} />

export const Standard = Template.bind({})
Standard.args = {
  children: 'Hello'
}
