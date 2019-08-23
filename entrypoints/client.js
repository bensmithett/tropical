import React from 'react'
import ReactDOM from 'react-dom'
import { createRenderer } from 'fela'
import { rehydrate } from 'fela-dom'
import { RendererProvider } from 'react-fela'

// Rehydrate Fela styles
const felaRenderer = createRenderer()
rehydrate(felaRenderer)

// Ensure all the components we'll rehydrate on the client are included in this map
import ExampleComponent from '../components/example_component/example_component'
const componentMap = {
  ExampleComponent
}

// Find & rehydrate prerendered components
document.querySelectorAll('[data-sanblas-hydrate-as]').forEach(island => {
  const Component = componentMap[island.dataset.sanblasHydrateAs]
  const componentProps = JSON.parse(island.dataset.sanblasHydrateWith)
  const element = (
    <RendererProvider renderer={felaRenderer}>
      <Component {...componentProps} />
    </RendererProvider>
  )
  ReactDOM.hydrate(element, island)
})

/*
You might wish to mount, rehydrate or setup other client side components here, e.g.

document.querySelectorAll('[data-footnote]')
  .forEach((el) => fancyFootnote(el))

ReactDOM.render(
  <RendererProvider renderer={felaRenderer}>
    <ChatBox />
  </RendererProvider>,
  document.querySelector('#chat-box')
)

$('.carousel').fancyCarousel()
*/
