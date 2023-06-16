import { useEffect, useState } from 'react'
import { paths } from './icons/paths'

const Icon = ({ variant, size }) => {
  const [component, setComponent] = useState(null)

  useEffect(() => {
    if (variant && paths[variant]) {
      paths[variant]
        .then((x) => { return x.default })
        .then(x => { return setComponent(x) })
    }
  }, [variant])

  return (
    <i data-size={size}>
      {component || null}
    </i>
  )
}

export { Icon }
