import {
  useEffect,
  useState
} from 'react'

import Link from 'next/link'

import { Checkbox } from '@/components/Checkbox/Checkbox'
import { CustomTooltip } from '@/components/Tooltip/Tooltip'
import { Icon } from '@/elements/Icon'

const NftCard = ({ name, views, count, nftId, image, soulbound, minted, selectable, checked, setChecked, onInfo }) => {
  const [selected, setSelected] = useState(checked || false)

  useEffect(() => {
    if (setChecked) {
      setChecked(selected)
    }
    // eslint-disable-next-line
  }, [selected])

  const wrap = (children) => {
    if (selectable) {
      return (
        <div className='nft card container'>
          <div className='checkbox wrapper'>
            <Checkbox
              checked={selected} onChange={(val) => {
                setSelected(val)
              }}
            />
          </div>
          {children}
        </div>
      )
    } else {
      return (
        <Link className='nft card container' href={`/marketplace/${nftId}`}>
          {children}
        </Link>
      )
    }
  }

  return wrap(
    <>
      <div className='image container'>
        <img src={image} loading='lazy' aria-labelledby={nftId} alt='' />

        {!selectable && (
          <div className='badges'>
            {minted && (
              <div className='badge text'>Minted</div>
            )}
            {soulbound && (
              <CustomTooltip text='Soulbound NFT'>
                <div className='badge'>
                  <Icon variant='star-04' size='sm' />
                </div>
              </CustomTooltip>
            )}
          </div>
        )}
      </div>

      <div className='contents'>
        <div className='title container'>
          <h3 id={nftId}>{name}</h3>
        </div>

        <div className='info container'>
          <div className='nft id'>
            #{nftId}
          </div>
          <div className='insights'>
            {selectable && (
              <div className='nft insight'>
                <button onClick={onInfo}>
                  <Icon variant='info-circle' size='sm' />
                </button>
              </div>
            )}
            {!selectable && (
              <div className='nft insight'>
                <span className='sr-only'>Views</span>
                <Icon variant='eye' size='sm' />
                <span>{views}</span>
              </div>
            )}
            {!selectable && (
              <div className='nft insight'>
                <span className='sr-only'>Count</span>
                <Icon variant='users-01' size='sm' />
                <span>{count}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </>

  )
}

export { NftCard }
