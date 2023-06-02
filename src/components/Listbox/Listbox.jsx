import {
  useRef,
  useState
} from 'react'
import { createPortal } from 'react-dom'

import { Icon } from '@/elements/Icon'

const Listbox = ({ options, value, setValue, maxHeight = 300 }) => {
  const [showOptions, setShowOptions] = useState(false)
  const position = useRef({
    top: 0,
    left: 0
  })

  return (
    <div className='listbox'>
      <button
        role='combobox'
        aria-controls='listbox-options'
        aria-expanded={showOptions}
        onClick={(e) => {
          const rect = e.currentTarget.getBoundingClientRect()

          const bodyHeight = window.innerHeight

          if (bodyHeight - rect.bottom < maxHeight - 8) {
            position.current = { bottom: bodyHeight - (rect.top - 8), left: rect.x, width: rect.width }
          } else {
            position.current = { top: rect.bottom + 8, left: rect.x, width: rect.width }
          }

          setShowOptions(!showOptions)
        }}
      >
        <div>

          {options.find(option => option.value === value)?.render() ?? '- Not Selected -'}

        </div>
        <Icon variant='chevron-down' size='lg' />
      </button>
      {showOptions && (
        createPortal(
          <div className='listbox options wrapper' style={{ top: position.current.top + 'px', left: position.current.left + 'px', width: position.current.width + 'px', bottom: position.current.bottom + 'px' }}>
            <div role='listbox' aria-label='List Options' className='listbox options' id='listbox-options' style={{ maxHeight: `${maxHeight}px` }}>
              {options.map(option => (
                <button
                  key={option.value}
                  className='option' onClick={() => {
                    setShowOptions(false)
                    setValue(option.value)
                  }} role='option' aria-selected={option.value === value}
                >
                  {option.render()}
                </button>
              ))}
            </div>
          </div>

          ,
          document.body
        )
      )}
    </div>
  )
}

export default Listbox
