/*
This is the JS file loaded in the browser by all static pages.

⚠️ Client-side JS is totally optional in San Blas! ⚠️
You can delete everything in here if you don't need it.

Or you can run whatever client-side JS you do need:
Analytics snippets, ReactDOM.render(), fancy graphs, etc...
*/

/*
⚛️ Optional:
Rehydrate prerendered React/Fela components using San Blas isomorphic helpers.

If you use asIsland() to render components in your pages, the following code
will rehydrate those components with the same props.

If you remove this code, the prerendered component HTML won't be rehydrated.
*/ 

import { createRenderer } from 'fela'
import { rehydrate } from 'fela-dom'
import { rehydrateIslands } from './isomorphic_helpers'

// Rehydrate Fela styles
const felaRenderer = createRenderer()
rehydrate(felaRenderer)

// Rehydrate San Blas islands
import WelcomeBanner from './components/welcome_banner/welcome_banner'

rehydrateIslands({
  WelcomeBanner
}, felaRenderer)
