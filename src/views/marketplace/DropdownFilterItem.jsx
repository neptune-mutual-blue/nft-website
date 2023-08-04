import React from 'react'

import {
  CheckboxWithMinus
} from '@/components/CheckboxWithMinus/CheckboxWithMinus'
import { Icon } from '@/elements/Icon'

const DropdownFilterItem = ({ filterKey, value, label, selected, showCheckbox = false, toggle }) => {
  return (
    <button
      className={`dropdown filter item${selected ? ' selected' : ''}`} onClick={() => {
        toggle(filterKey, value)
      }}
    >
      <div className='label'>
        {showCheckbox && (
          <CheckboxWithMinus
            tabIndex={-1}
            checked={selected}
            onChange={() => {}}
          />
        )}
        <div>{label}</div>
      </div>
      {selected && (
        <Icon variant='check' size='lg' />
      )}
    </button>
  )
}

export default DropdownFilterItem
