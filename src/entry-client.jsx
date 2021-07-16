const control = document.querySelector('[data-burger-control]')
const menu = document.querySelector('[data-burger-target]')

control.addEventListener(
  'click',
  () => (menu.dataset.burgerTarget = menu.dataset.burgerTarget === 'closed' ? 'open' : 'closed')
)
