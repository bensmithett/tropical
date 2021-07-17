import React from 'react'

import { TropicalPhotoButton } from './TropicalPhotoButton'

export default {
  title: 'TropicalPhotoButton',
  component: TropicalPhotoButton
}

const Template = (args) => <TropicalPhotoButton {...args} />

export const Standard = Template.bind({})
Standard.args = {
  children: 'Click me',
  alertMessage: 'Hello!'
}
