import { createRenderer } from 'fela'
import { rehydrate } from 'fela-dom'
import { rehydrateIslands } from './isomorphic_helpers'

// Rehydrate Fela styles
const felaRenderer = createRenderer()
rehydrate(felaRenderer)

// Rehydrate San Blas islands
rehydrateIslands({}, felaRenderer)
