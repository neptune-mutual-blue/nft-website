import { Button } from '@/components/Button/Button'

const Slider = (props) => {
  const { gap, children } = props
  return (
    <div className='slider container extra padding' data-gap={gap}>
      <div className='slider scrollable'>
        {children}
      </div>

      <div className='arrows initially hidden'>
        <Button
          disabled
          variant='secondary-gray'
          icon='only'
          iconLeading='arrow-left'
        >
          Previous
        </Button>

        <Button variant='secondary-gray' icon='only' iconLeading='arrow-right'>
          Next
        </Button>
      </div>
    </div>
  )
}

export { Slider }
