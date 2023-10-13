import Link from 'next/link'

const AnchorButton = (props) => {
  const {
    id,
    children,
    className,
    disabled,
    href,
    target,
    rel,
    size,
    state,
    style,
    destructive,
    iconOnlyMobile,
    onClick
  } = props

  return (
    <Link
      id={id}
      style={style}
      onClick={onClick}
      className={`ui ${(className || '').trim()} button`}
      data-text-size={size}
      data-disabled={(disabled || state === 'disabled') ? true : undefined}
      data-state={state}
      data-destructive={destructive}
      data-icon-only-mobile={iconOnlyMobile}
      href={href}
      target={target}
      rel={rel}
    >
      {children}
    </Link>
  )
}

export { AnchorButton }
