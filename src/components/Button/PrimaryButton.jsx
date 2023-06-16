import { VanillaButton } from '@/components/Button/_base'
import { forwardRef } from 'react'

const PrimaryButton = forwardRef((props, ref) => {
  const { classname, children } = props
  return (
    <VanillaButton
      type='button'
      className={`${classname || ''} primary`.trim()}
      ref={ref}
      {...props}
    >
      {children}
    </VanillaButton>
  )
})

PrimaryButton.displayName = 'PrimaryButton'

export { PrimaryButton }
