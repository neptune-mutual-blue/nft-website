import { LinkColorButton } from '@/components/Button/LinkColorButton'
import { LinkGrayButton } from '@/components/Button/LinkGrayButton'
import { PrimaryButton } from '@/components/Button/PrimaryButton'
import SecondaryGrayButton from '@/components/Button/SecondaryGrayButton'
import { forwardRef } from 'react'

// eslint-disable-next-line react/display-name
const Button = forwardRef((props, forwardedRef) => {
  const { variant, children } = props

  let BtnComponent = PrimaryButton

  switch (variant) {
    case 'link-color':
      BtnComponent = LinkColorButton
      break
    case 'link-gray':
      BtnComponent = LinkGrayButton
      break
    case 'secondary-gray':
      BtnComponent = SecondaryGrayButton
  }

  return (
    <BtnComponent ref={forwardedRef} {...props}>
      {children}
    </BtnComponent>
  )
})

export { Button }
