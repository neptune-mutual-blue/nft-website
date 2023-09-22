import { Icon } from '@/elements/Icon'

const VerticalTimeline = ({
  items
}) => {
  if (!Array.isArray(items) || !items.length) { return null }

  return (
    <div className='vertical timeline container'>
      {
          items.map((item, idx) => {
            return (
              <div key={idx} className='item'>
                <div className='check'>
                  {
                  item.completed
                    ? <Icon variant='check-circle-filled' />
                    : <div className='empty' />
                  }

                  {
                    idx < (items.length - 1) && (
                      <div className={`line${(item.completed && items[idx + 1]?.completed) ? ' completed' : ''}`} />
                    )
                  }
                </div>

                <div className='content'>
                  {item.label}
                </div>
              </div>
            )
          })
        }
    </div>
  )
}

export { VerticalTimeline }
