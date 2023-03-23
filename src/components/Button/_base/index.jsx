const { AnchorButton } = require('@/components/Button/_base/_anchor')
const { BaseButton } = require('@/components/Button/_base/_button')
const { Icon } = require('@/elements/Icon')

const VanillaButton = (props) => {
  const { type, icon, iconOnlyMobile, iconVariant, iconLeading, iconTrailing, children } = props

  const UntypedElement = type === 'anchor' ? AnchorButton : BaseButton

  return (
    <UntypedElement {...props}>
      {iconLeading && <Icon variant={iconLeading} />}

      <span
        className={`content${icon === 'only' ? ' hidden' : ''}`}
        data-icon-only-mobile={iconOnlyMobile}
      >
        {children}
      </span>

      {
      (iconTrailing || iconVariant) && (
        <Icon variant={iconTrailing || iconVariant} />
      )
    }
    </UntypedElement>
  )
}

export { VanillaButton }
