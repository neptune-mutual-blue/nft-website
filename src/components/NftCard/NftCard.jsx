import Link from 'next/link'

import { Icon } from '@/elements/Icon'
import { formatText } from '@/utils/helpers'

const NftCard = ({ name, views, count, nftId, image }) => {
  return (
    <Link className='nft card container' href={`/marketplace/${nftId}`}>
      <div className='image container'>
        <img src={image} loading='lazy' aria-labelledby={formatText(name)} alt='' />
      </div>

      <div className='contents'>
        <div className='title container'>
          <h3 id={formatText(name)}>{name}</h3>
        </div>

        <div className='info container'>
          <div className='nft id'>
            #{nftId}
          </div>
          <div className='insights'>
            <div className='nft insight'>
              <span className='sr-only'>Views</span>
              <Icon variant='eye' size='sm' />
              <span>{views}</span>
            </div>
            <div className='nft insight'>
              <span className='sr-only'>Count</span>
              <Icon variant='users-01' size='sm' />
              <span>{count}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

export { NftCard }
