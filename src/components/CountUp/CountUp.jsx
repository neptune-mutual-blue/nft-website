import {
  useEffect,
  useMemo,
  useRef,
  useState
} from 'react'

import { localizeValue } from '@/utils/currencyHelpers'
import { linspace } from '@/utils/linspace'

const getReadableCounterValue = ({ localized, val, number }) => {
  const isTargetInteger = number % 1 === 0

  const value = val < number ? isTargetInteger ? Math.floor(val) : val.toFixed(2) : val

  if (localized) {
    return localizeValue(value)
  } else {
    return value
  }
}

const CountUp = ({ number, symbol, prefix = false, localized = false }) => {
  const [val, setVal] = useState(0)

  const countRef = useRef()
  const [shouldStartAnimation, setShouldStartAnimation] = useState(false)

  const steps = useMemo(() => { return linspace(0, number, 50) }, [number])

  const diff = useMemo(() => { return steps[1] - steps[0] }, [steps])

  useEffect(() => {
    if (shouldStartAnimation && val < number) {
      setTimeout(() => {
        if (val + diff >= number) {
          setVal(number)
        } else {
          setVal(val + diff)
        }
      }, 20)
    }
  }, [val, number, diff, shouldStartAnimation])

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setShouldStartAnimation(true)
        }
      })
    })

    setTimeout(() => {
      observer.observe(countRef.current)
    }, 0)

    return () => {
      observer.disconnect()
    }
  }, [])

  const counterValue = getReadableCounterValue({ localized, val, number })

  if (number <= 0) {
    return <span ref={countRef}>{prefix && symbol}{localized ? localizeValue(number) : number}{!prefix && symbol}</span>
  }

  return (
    <span ref={countRef}>{prefix && symbol}{counterValue}{!prefix && symbol}</span>
  )
}

export default CountUp
