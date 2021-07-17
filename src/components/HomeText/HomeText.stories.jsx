import React from 'react'
import { HomeText } from './HomeText'

export default {
  title: 'HomeText',
  component: HomeText
}

const Template = (args) => <HomeText {...args} />

export const Standard = Template.bind({})
Standard.args = {
  // props here
}
