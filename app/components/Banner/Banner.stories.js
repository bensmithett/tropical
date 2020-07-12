import React from 'react'
import Banner from './Banner'
import Background from '../Background/Background'

export default { title: 'Banner' }

export const normal = () => (
  <Background>
    <Banner />
  </Background>
)
