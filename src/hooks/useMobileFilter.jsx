import { useState } from 'react'

export const useMobileFilter = () => {
  const [showFilter, setShowFilter] = useState(false)

  const onFilterOpen = () => {
    setShowFilter(true)
    document.querySelector('body').style.overflow = 'hidden'
  }

  const onFilterClose = () => {
    setShowFilter(false)
    document.querySelector('body').style.overflow = 'visible'
  }

  return { showFilter, onFilterOpen, onFilterClose }
}
