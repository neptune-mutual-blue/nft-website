import {
  useEffect,
  useState
} from 'react'

const Progress = ({ percent }) => {
  const [val, setVal] = useState(0)

  const animate = () => {
    setTimeout(() => {
      setVal(percent)
    }, 0)
  }

  useEffect(() => {
    animate()
    // eslint-disable-next-line
  }, [percent])

  return (
    <div className='progress bar'>
      <div className='value' style={{ width: val + '%' }} />
    </div>
  )
}

export { Progress }
