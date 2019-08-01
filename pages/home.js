import React from 'react'
import {Island} from '../sanblas'
import Nav from '../components/nav'

export default function Home () {
  return (
    <>
      <Island
        as='header'
        hydrateAs='Nav'
        component={Nav}
        componentProps={{
          items: ['home', 'about', 'help']
        }}
      />

      <div role='main'>
        <p>Hello world</p>
      </div>
    </>
  )
}
