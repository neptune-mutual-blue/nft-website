import React from 'react'

const Skeleton = ({ style, className }) => {
  return (
    <div className={'skeleton placeholder' + (className ? ' ' + className : '')} style={style} />
  )
}

export default Skeleton
