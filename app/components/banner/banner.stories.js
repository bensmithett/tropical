import React from 'react'
import Banner from './banner'
import Background from '../background/background'

export default { title: 'Banner' }

export const normal = () => (
  <Background>
    <Banner />
  </Background>
)
