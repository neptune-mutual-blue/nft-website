import { forwardRef } from 'react'

const { VanillaButton } = require('@/components/Button/_base')

const UntypedButton = VanillaButton

const LinkColorButton = forwardRef((props, ref) => {
  const { classname, children } = props

  return (
    <UntypedButton
      className={`${classname || ''} link color`.trim()}
      ref={ref}
      {...props}
    >
      {children}
    </UntypedButton>
  )
})

LinkColorButton.displayName = 'LinkColorButton'

export { LinkColorButton }
