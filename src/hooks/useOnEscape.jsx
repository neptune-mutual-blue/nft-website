import { useEffect } from 'react'

const useOnEscape = (callback) => {
  useEffect(() => {
    const close = (e) => {
      if (e.key === 'Escape') {
        callback()
      }
    }

    window.addEventListener('keyup', close)

    return () => {
      window.removeEventListener('keyup', close)
    }
  })
}

export default useOnEscape
