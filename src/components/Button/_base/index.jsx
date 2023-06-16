import { forwardRef } from 'react'

const { AnchorButton } = require('@/components/Button/_base/_anchor')
const { BaseButton } = require('@/components/Button/_base/_button')
const { Icon } = require('@/elements/Icon')

const VanillaButton = forwardRef((props, ref) => {
  const { type, icon, iconOnlyMobile, iconLeading, iconTrailing, children } = props

  const UntypedElement = type === 'anchor' ? AnchorButton : BaseButton

  return (
    <UntypedElement ref={ref} {...props}>
      {iconLeading && <Icon variant={iconLeading} />}

      <span
        className={`content${icon === 'only' ? ' hidden' : ''}`}
        data-icon-only-mobile={iconOnlyMobile}
      >
        {children}
      </span>

      {iconTrailing && (
        <Icon variant={iconTrailing} />
      )}
    </UntypedElement>
  )
})

VanillaButton.displayName = 'VanillaButton'

export { VanillaButton }
