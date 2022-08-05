import { createRenderer } from 'fela'
import { RendererProvider } from 'react-fela'
import { hydrateIslands } from 'tropical-islands'
import { ExampleComponent } from './components/ExampleComponent'

function Providers({ children }) {
  return <RendererProvider renderer={createRenderer()}>{children}</RendererProvider>
}

console.log('hydrating...')
hydrateIslands({ ExampleComponent }, Providers)
console.log('hydrated!')
