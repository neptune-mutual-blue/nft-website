import {
  useMemo,
  useRef,
  useState
} from 'react'

import { Button } from '@/components/Button/Button'
import { Checkbox } from '@/components/Checkbox/Checkbox'
import { Icon } from '@/elements/Icon'
import { useOnClickOutside } from '@/hooks/useOnOutsideClick'

const createToggleStates = (filters) => {
  return filters.reduce((acc, curr) => {
    acc[curr.key] = false
    return acc
  }, {})
}

const Filter = ({ filters = [], properties, setProperties, showFilter, onFilterClose }) => {
  const [toggles, setToggles] = useState(createToggleStates(filters))
  const [selectedFilters, setSelectedFilters] = useState(properties)
  const [searchValue, setSearchValue] = useState('')

  const ref = useRef()

  useOnClickOutside(ref, () => onFilterClose())

  const handleToggle = key => {
    setToggles(_toggles => ({ ..._toggles, [key]: !_toggles[key] }))
  }

  const handleFilterUpdate = (key, value) => {
    const _selectedFilters = selectedFilters
    const itemIndex = _selectedFilters.findIndex(filter => filter.key === key && filter.value === value)
    if (itemIndex > -1) {
      _selectedFilters.splice(itemIndex, 1)
    } else {
      _selectedFilters.push({ key, value })
    }
    setSelectedFilters([..._selectedFilters])
    if (!showFilter) setProperties([..._selectedFilters])
  }

  const applyFilterUpdate = () => {
    const _selectedFilters = selectedFilters
    setProperties([..._selectedFilters])
    onFilterClose()
  }

  const handleSearch = (e) => {
    setSearchValue(e.target.value)
  }

  const filteredProperties = useMemo(() => {
    return filters.map(f => {
      return {
        key: f.key,
        values: f.values.filter(v => v && v.toLowerCase().includes(searchValue.toLowerCase()))
      }
    })
  }, [searchValue, filters])

  return (
    <div ref={ref} className='marketplace filter container' id='view-nfts' data-open={showFilter ? 'true' : 'false'}>
      <div className='filter inner'>
        <div className='filter heading'>
          <h2>Properties</h2>
          <button className='button' onClick={() => onFilterClose()}>
            <span className='label-hidden'>Close Filter</span>
            <i data-icon='x'>
              <Icon variant='x' />
            </i>
          </button>
        </div>
        <div className='input container'>
          <Icon variant='search-lg' />
          <label htmlFor='properties' className='label-hidden'>Properties</label>
          <input
            id='properties'
            className='search'
            placeholder='Search by Properties'
            value={searchValue}
            onChange={handleSearch}
            aria-label='Search Properties'
          />
        </div>

        <div className='filters list'>
          {
            filteredProperties.map((filter, i) => (
              <div
                className={`filter container ${toggles[filter.key] && 'active'}`}
                key={i}
              >
                <button onClick={() => handleToggle(filter.key)}>
                  <span className='name'>{filter.key}</span>
                  <span className='count'>{filter.values.length}</span>
                  <Icon variant='chevron-down' />
                </button>

                <div className='options'>
                  <ul>
                    {
                      filter.values.map((value, idx) => {
                        const checked = selectedFilters.find(f => {
                          return f.key === filter.key && f.value === value
                        })
                        return (
                          <li className='option' key={idx}>
                            <Checkbox
                              label={value}
                              checked={Boolean(checked)}
                              onChange={() => handleFilterUpdate(filter.key, value)}
                            />
                          </li>
                        )
                      })
                    }
                  </ul>
                </div>
              </div>
            ))
          }
        </div>

        {showFilter && <Button type='button' size='xl' onClick={() => applyFilterUpdate()}>Apply Filter</Button>}
      </div>
    </div>
  )
}

export { Filter }
