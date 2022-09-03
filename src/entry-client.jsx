const control = document.querySelector('[data-burger-control]')
const menu = document.querySelector('[data-burger-target]')

control && control.addEventListener(
  'click',
  () => (menu.dataset.burgerTarget = menu.dataset.burgerTarget === 'closed' ? 'open' : 'closed')
)

import { littlefoot } from 'littlefoot'
import css from 'littlefoot/dist/littlefoot.css'
littlefoot()
