import { Icon } from '@/elements/Icon'
import { useEffect, useRef, useState } from 'react'

const IconButton = (props) => {
  const { onClick, variant, size, showFeedback = false, noWrapper = false } = props

  const [feedback, setFeedback] = useState(false)

  const timer = useRef()

  useEffect(() => {
    if (feedback) {
      if (timer) {
        clearTimeout(timer.current)
      }

      timer.current = setTimeout(() => {
        setFeedback(false)
      }, 1000)
    }
  }, [feedback])

  return (
    <div
      className={'icon button' + (noWrapper ? ' no wrapper' : '')}
      onClick={() => {
        onClick?.()
        if (showFeedback) {
          setFeedback(true)
        }
      }}
    >
      {feedback &&
        <Icon variant='check' size={size} />}
      {!feedback &&
        <Icon variant={variant} size={size} />}
    </div>
  )
}

export { IconButton }
