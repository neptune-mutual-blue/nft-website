import { forwardRef } from 'react'

const BaseButton = forwardRef((props, ref) => {
  const {
    id,
    className,
    disabled,
    size,
    state,
    destructive,
    iconOnlyMobile,
    onClick,
    children
  } = props

  return (
    <button
      id={id}
      onClick={onClick}
      className={`ui ${(className || '').trim()} button`}
      data-text-size={size}
      disabled={(disabled || state === 'disabled')}
      data-state={state}
      data-destructive={destructive}
      data-icon-only-mobile={iconOnlyMobile}
      ref={ref}
    >
      {children}
    </button>
  )
})

BaseButton.displayName = 'BaseButton'

export { BaseButton }
