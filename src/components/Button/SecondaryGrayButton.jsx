import { VanillaButton } from '@/components/Button/_base'
import { forwardRef } from 'react'

const SecondaryGrayButton = forwardRef((props, ref) => {
  const { classname, children } = props

  return (
    <VanillaButton
      type='button'
      className={`${classname || ''} secondary gray`.trim()}
      ref={ref}
      {...props}
    >
      {children}
    </VanillaButton>
  )
})

SecondaryGrayButton.displayName = 'SecondaryGrayButton'

export default SecondaryGrayButton
