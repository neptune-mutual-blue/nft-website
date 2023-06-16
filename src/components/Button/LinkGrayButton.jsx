import { VanillaButton } from '@/components/Button/_base'
import { forwardRef } from 'react'

const LinkGrayButton = forwardRef((props, ref) => {
  const { classname, children } = props
  return (
    <VanillaButton
      type='anchor'
      className={`${classname || ''} link gray`.trim()}
      ref={ref}
      {...props}
    >
      {children}
    </VanillaButton>
  )
})

LinkGrayButton.displayName = 'LinkGrayButton'

export { LinkGrayButton }
