import React from 'react'
import {Helmet} from 'react-helmet-async'
import Island from '../components/island/island'
import ExampleComponent from '../components/example_component/example_component'

export default function IndexPage () {
  return (
    <>
      <Helmet>
        <title>Your San Blas site is ready</title>
      </Helmet>

      <Island
        as='header'
        hydrateAs='ExampleComponent'
        component={ExampleComponent}
        componentProps={{
          alertMessage: 'An yeel itoe'
        }}
      />
    </>
  )
}
