import {
  useMemo,
  useRef,
  useState
} from 'react'

import { Button } from '@/components/Button/Button'
import SecondaryGrayButton from '@/components/Button/SecondaryGrayButton'
import { Radio } from '@/components/Radio/Radio'
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

  useOnClickOutside(ref, () => { return onFilterClose() })

  const handleToggle = key => {
    setToggles(_toggles => { return { ..._toggles, [key]: !_toggles[key] } })
  }

  const handleFilterUpdate = (key, value) => {
    // TODO: HANDLE MULTIPLE VALUES FOR SAME PROPERTIES

    // const _selectedFilters = selectedFilters
    // const itemIndex = _selectedFilters.findIndex(filter => filter.key === key && filter.value === value)
    // if (itemIndex > -1) {
    //   _selectedFilters.splice(itemIndex, 1)
    // } else {
    //   _selectedFilters.push({ key, value })
    // }

    const _selectedFilters = selectedFilters.filter(filter => { return filter.key !== key })

    _selectedFilters.push({ key, value })
    setSelectedFilters([..._selectedFilters])
    if (!showFilter) { setProperties([..._selectedFilters]) }
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
        values: f.values.filter(v => { return v && v.toLowerCase().includes(searchValue.toLowerCase()) })
      }
    })
  }, [searchValue, filters])

  const handleClearAll = () => {
    if (properties.length) {
      setProperties([])
    }
    if (selectedFilters.length) {
      setSelectedFilters([])
    }
  }

  const handleClearFilter = (key) => {
    const newProperties = properties.filter(p => {
      return p.key !== key
    })
    setProperties([...newProperties])
    setSelectedFilters([...newProperties])
  }

  return (
    <div ref={ref} className='marketplace filter container' id='view-nfts' data-open={showFilter ? 'true' : 'false'}>
      <div className='filter inner'>
        <div className='filter heading'>
          <h2>Properties</h2>
          <button className='button' onClick={() => { return onFilterClose() }}>
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

        <SecondaryGrayButton
          className='clear all'
          onClick={handleClearAll}
          disabled={!selectedFilters.length}
        >
          Clear All Filters
        </SecondaryGrayButton>

        <div className='filters list'>
          {
            filteredProperties.map((filter, i) => {
              const selectedCount = selectedFilters.find(f => { return f.key === filter.key })
              return (
                <div
                  className={`filter container ${toggles[filter.key] && 'active'}`}
                  key={i}
                >
                  <button onClick={() => { return handleToggle(filter.key) }}>
                    {/* TODO: Remove hardcoded `(1)` after multiple filters selection is supported */}
                    <span className='name'>
                      {filter.key} {selectedCount && <span className='selected'>(1)</span>}
                    </span>
                    <span className='count'>{filter.values.length}</span>
                    <Icon variant='chevron-down' />
                  </button>

                  <div className='options'>

                    <div className='wrapper'>
                      <SecondaryGrayButton
                        className='clear'
                        onClick={() => {
                          handleClearFilter(filter.key)
                        }}
                        disabled={!selectedFilters.find(f => {
                          return f.key === filter.key
                        })}
                      >
                        Clear Filter
                      </SecondaryGrayButton>
                    </div>

                    <ul>
                      {
                        filter.values.map((value, idx) => {
                          const checked = selectedFilters.find(f => {
                            return f.key === filter.key && f.value === value
                          })
                          return (
                            <li className='option' key={idx}>
                              <Radio
                                label={value}
                                checked={Boolean(checked)}
                                onChange={() => { return handleFilterUpdate(filter.key, value) }}
                              />
                            </li>
                          )
                        })
                      }
                    </ul>

                  </div>
                </div>
              )
            })
          }
        </div>

        {showFilter && (
          <Button
            type='button'
            size='xl'
            onClick={() => { return applyFilterUpdate() }}
          >
            Apply Filter
          </Button>
        )}
      </div>
    </div>
  )
}

export { Filter }
