import { createRenderer } from 'fela'
import { rehydrate } from 'fela-dom'
import islands from '../components/islands'
import { rehydrateIslands } from '../isomorphic_helpers'

// Rehydrate Fela styles
const felaRenderer = createRenderer()
rehydrate(felaRenderer)

// Rehydrate San Blas islands
rehydrateIslands(islands, felaRenderer)

/*
You may wish to mount, manually rehydrate or setup other client side components here, e.g.

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
