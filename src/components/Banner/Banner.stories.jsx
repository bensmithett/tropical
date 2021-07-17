import React from 'react'
import { Banner } from './Banner'
import { Background } from '../Background'

export default {
  title: 'Banner',
  component: Banner,
  parameters: { layout: 'fullscreen' }
}

const Template = (args) => <Background><Banner {...args} /></Background>

export const Standard = Template.bind({})
Standard.args = {
  // props here
}
