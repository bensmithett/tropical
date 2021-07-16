import React from 'react'
import { DocsLayout } from './DocsLayout'

export default {
  title: 'DocsLayout',
  component: DocsLayout,
  parameters: { layout: 'fullscreen' }
}

const Template = (args) => <DocsLayout {...args} />

export const Standard = Template.bind({})
Standard.args = {
  nav: <div style={{ height: '200vh' }}>Nav</div>,
  page: <div style={{ height: '200vh' }}>Page</div>
}
