/*
This is the JS file loaded in the browser by all static pages.

⚠️ Client-side JS is totally optional in Tropical! ⚠️
You can delete everything in here if you don't need it.

Or you can run whatever client-side JS you do need:
Analytics snippets, ReactDOM.render(), fancy graphs, etc...
*/

/*
⚛️ Optional:
Hydrate prerendered React/Fela components using Tropical hydration helpers.

If you wrap components in your pages with the asIsland() HOC, the following code
will hydrate those components with the same props they were rendered with.

All components requiring hydration must be explicitly imported and passed to hydrateIslands().

If you remove the following code, the prerendered component won't be hydrated.
*/ 

import { createRenderer } from 'fela'
import { rehydrate } from 'fela-dom'
import { hydrateIslands } from './hydrationHelpers'

// Hydrate Fela styles
const felaRenderer = createRenderer()
rehydrate(felaRenderer)

// Hydrate Tropical islands
import ExampleComponent from './components/ExampleComponent/ExampleComponent'

hydrateIslands({
  ExampleComponent
}, felaRenderer)
