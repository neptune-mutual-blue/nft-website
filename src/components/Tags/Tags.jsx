import { Icon } from '@/elements/Icon'

const Tags = (props) => {
  const { tags, showAll, size } = props
  const all = showAll ? tags : tags?.slice(0, 1)

  return (
    <>
      {
  tags && (
    <div className='tags container'>
      {all?.map((tag, idx) => {
        return tag.href
          ? (
            <a className='tag' key={idx} data-color={tag.color} href={tag.href}>
              {tag.icon && (
                <Icon variant={tag.icon.toLowerCase()} size={tag.size || size} />
              )}
              <span>{tag.name || tag.text}</span>
            </a>
            )
          : (
            <span className='tag' data-color={tag.color} key={idx}>
              {tag.icon && (
                <Icon variant={tag.icon.toLowerCase()} size={tag.size || size} />
              )}
              <span>{tag.name || tag.text}</span>
            </span>
            )
      })}
    </div>
  )
}

    </>
  )
}

export { Tags }
