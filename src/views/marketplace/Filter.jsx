import { Checkbox } from '@/components/Checkbox/Checkbox'
import { Icon } from '@/elements/Icon'
import { useMemo, useState } from 'react'

const createToggleStates = (filters) => {
  return filters.reduce((acc, curr) => {
    acc[curr.key] = false
    return acc
  }, {})
}

const Filter = ({ filters = [], setProperties }) => {
  const [toggles, setToggles] = useState(createToggleStates(filters))
  const [selectedFilters, setSelectedFilters] = useState([])
  const [searchValue, setSearchValue] = useState('')

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
    setProperties([..._selectedFilters])
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
    <div className='marketplace filter container'>
      <div className='filter inner'>
        <h2>Properties</h2>

        <div className='input container'>
          <Icon variant='search-lg' />
          <input
            className='search'
            placeholder='Search by Properties'
            value={searchValue}
            onChange={handleSearch}
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
                            {/* <input
                              type='checkbox'
                              id={`option-${value}`}
                              checked={Boolean(checked)}
                              onChange={() => handleFilterUpdate(filter.key, value)}
                            />
                            <label htmlFor={`option-${value}`}>{value}</label> */}
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
      </div>
    </div>
  )
}

export { Filter }
