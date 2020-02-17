import { registerIslands } from '../isomorphic_helpers'
import ExampleComponent from './example_component/example_component'

/* San Blas Islands
-----------------------
Components registered here will be included in the client JS bundle
so we can rehydrate the prerendered versions.

The default export of this module is an object containing "Island" components
that wrap your original component in an element with some data attributes.

This enables automatic rehydration of your isomorphic components.
*/

export default registerIslands({
  ExampleComponent

  /*
  To customise the island tag itself:

  ExampleComponent: {
    component: ExampleComponent,
    islandTag: 'p',
    islandProps: {
      'aria-hidden': true,
      className: 'example-component-island'
    }
  }
  */
})
