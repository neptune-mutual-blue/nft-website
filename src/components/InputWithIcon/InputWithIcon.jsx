const { Icon } = require('@/elements/Icon')

const InputWithIcon = ({ icon = 'search-lg', placeholder, onChange, iconProps = {}, ...rest }) => {
  return (
    <div className='input with icon container'>
      <Icon variant={icon} size='lg' {...iconProps} />
      <input placeholder={placeholder} onChange={e => { return onChange(e.target.value) }} type={rest.type || 'text'} {...rest} />
    </div>
  )
}

export { InputWithIcon }
