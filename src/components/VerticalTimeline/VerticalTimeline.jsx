import { Icon } from '@/elements/Icon'

const VerticalTimeline = ({
  items
}) => {
  if (!Array.isArray(items) || !items.length) { return null }

  const sortedItems = items.filter(Boolean).sort((a, b) => { return (b.completed ? 1 : 0) - (a.completed ? 1 : 0) })

  return (
    <div className='vertical timeline container'>
      {
          sortedItems.map((item, idx) => {
            return (
              <div key={idx} className='item'>
                <div className='check'>
                  {
                  item.completed
                    ? <Icon variant='check-circle-filled' />
                    : <div className='empty' />
                  }

                  {
                    idx < (sortedItems.length - 1) && (
                      <div className={`line${(item.completed && sortedItems[idx + 1]?.completed) ? ' completed' : ''}`} />
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
