import React from 'react'
import Header from './header'
import Background from '../background/background'

export default { title: 'Header' }

export const normal = () => (
  <Background>
    <Header />
  </Background>
)
