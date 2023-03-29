import { Icon } from '@/elements/Icon'

const HamburgerButton = () => {
  return (
    <button className='hamburger button container' data-open='false'>
      <span>Toggle menu</span>
      <i data-icon='menu'>
        <Icon size='lg' variant='menu-01' />
      </i>
      <i data-icon='close'>
        <Icon size='lg' variant='x-close' />
      </i>
    </button>
  )
}

export default HamburgerButton
