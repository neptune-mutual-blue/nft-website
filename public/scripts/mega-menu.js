const megaMenu = () => {
  const subMenu = document.querySelector('.sub.menu.container')

  function click (event) {
    event.stopPropagation()

    const openState = subMenu.getAttribute('data-open')
    const newState = openState === 'true' ? 'false' : 'true'

    subMenu.setAttribute('data-open', newState)
    event.currentTarget.setAttribute('data-open', newState)
  }

  document.querySelector('.display.resources.mega.menu').addEventListener('click', click)

  document.addEventListener('click', (e) => {
    const button = document.querySelector('nav button[data-open="true"]')
    const subMenu = document.querySelector('.sub.menu.container')

    if (!button) return

    const width = window.innerWidth

    if (width < 1024) {
      if (!e.target.closest('#MobileMenu')) {
        subMenu.setAttribute('data-open', 'false')
        button.setAttribute('data-open', 'false')
      }
      return
    }

    if (!e.target.closest('.sub.menu.container')) {
      subMenu.setAttribute('data-open', 'false')
      button.setAttribute('data-open', 'false')
    }
  })
}

window.megaMenu = megaMenu

megaMenu()
