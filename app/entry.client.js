import { createRenderer } from 'fela'
import { rehydrate } from 'fela-dom'
import { hydrateIslands } from './hydration_helpers'

// Hydrate Fela styles
const felaRenderer = createRenderer()
rehydrate(felaRenderer)

// Hydrate Tropical islands
hydrateIslands({}, felaRenderer)
