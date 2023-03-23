import { useEffect, useState } from 'react'
import { paths } from './icons/paths'

const Icon = ({ variant, size }) => {
  const [component, setComponent] = useState(null)

  const setHTML = async () => {
    let html = null

    if (variant !== undefined) {
      html = await paths[variant].then((x) => x.default)

      setComponent(html)
    }
  }

  useEffect(() => {
    setHTML()
  }, [])

  return (
    <i data-size={size}>
      {component}
    </i>
  )
}

export { Icon }
