import { LinkColorButton } from '@/components/Button/LinkColorButton'
import { LinkGrayButton } from '@/components/Button/LinkGrayButton'
import { PrimaryButton } from '@/components/Button/PrimaryButton'
import SecondaryGrayButton from '@/components/Button/SecondaryGrayButton'

const Button = (props) => {
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
    <BtnComponent {...props}>
      {children}
    </BtnComponent>
  )
}

export { Button }
