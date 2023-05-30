import { useState } from 'react'

import { Icon } from '@/elements/Icon'
import useOnEscape from '@/hooks/useOnEscape'

const NftImageWithExpand = ({ nft, isCover }) => {
  const [expanded, setExpanded] = useState(false)

  useOnEscape(() => {
    setExpanded(false)
  })

  return (
    <div className={`nft image with expand ${!isCover ? 'thumbnail' : ''}`}>
      <div
        className={'image wrapper' + (expanded ? ' expanded' : '')} onClick={() => {
          if (expanded) {
            setExpanded(false)
          }
        }}
      >
        <button
          className='fullscreen icon' role='button' tabIndex={0} onClick={() => {
            setExpanded(!expanded)
          }}
        >
          <span className='label-hidden'>Expand Image</span>
          <Icon variant='expand-01' size='lg' />
        </button>

        <img
          src={nft.cover} alt={nft.name}
        />
      </div>

      <img
        src={isCover ? nft.cover : nft.thumbnail} alt={nft.name}
      />
      <button
        className='fullscreen icon' role='button' tabIndex={0} onClick={() => {
          setExpanded(!expanded)
        }}
      >
        <span className='label-hidden'>Expand Image</span>
        <Icon variant='expand-01' size='lg' />
      </button>
    </div>
  )
}

export default NftImageWithExpand
