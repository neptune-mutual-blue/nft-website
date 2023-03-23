import { Button } from '@/components/Button/Button'

const HeaderSection = (props) => {
  const { heading, subheading, children, supportingText, alignment, color, primary, secondary, hero } = props

  const actions = primary || secondary || null
  return (
    <div className={`ui ${color} ${alignment} hero section`.trim()}>
      <div className='full width container'>
        <div className='content'>
          <div className='text block and hero'>
            <div className='heading and supporting text'>
              <h1 className='heading and subheading'>
                {subheading && <div className='sub heading'>{subheading}</div>}
                <span className='heading'>{heading}</span>
              </h1>

              <div className='supporting text'>{supportingText}</div>
            </div>

            {
          hero && (
            <div className='hero'>
              <img src={hero?.src} alt={hero?.alt} loading={hero?.loading} />
            </div>
          )
        }
          </div>

          {
        actions && (
          <div className='actions'>
            {secondary && (
              <Button
                type='anchor'
                variant='secondary-gray'
                size={secondary.size}
                href={secondary.href}
                rel={secondary.rel}
                target={secondary.target}
                iconLeading={secondary.iconLeading}
                iconTrailing={secondary.iconTrailing}
              >
                {secondary.text}
              </Button>
            )}

            {primary && (
              <Button
                type='anchor'
                variant='primary'
                size={primary.size}
                href={primary.href}
                rel={primary.rel}
                target={primary.target}
                iconLeading={primary.iconLeading}
                iconTrailing={primary.iconTrailing}
              >
                {primary.text}
              </Button>
            )}
          </div>
        )
      }

          {children}
        </div>
      </div>
    </div>

  )
}

export { HeaderSection }
