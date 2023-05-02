import { useEffect, useState } from 'react'
import { paths } from './icons/paths'

const Icon = ({ variant, size }) => {
  const [component, setComponent] = useState(null)

  useEffect(() => {
    if (variant && paths[variant]) {
      paths[variant]
        .then((x) => x.default)
        .then(x => setComponent(x))
    }
  }, [variant])

  return (
    <i data-size={size}>
      {component || null}
    </i>
  )
}

export { Icon }
