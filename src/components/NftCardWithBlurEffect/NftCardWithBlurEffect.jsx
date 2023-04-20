import Link from 'next/link'

import { formatText } from '@/utils/helpers'
import { getMarketplaceFiltersHref } from '@/utils/nft'

const NftCardWithBlurEffect = (props) => {
  const { nft, className } = props

  return (
    <div className={'blur effect character details' + (className ? ' ' + className : '')}>
      <Link
        key={nft.name}
        href={getMarketplaceFiltersHref(nft)}
      >
        <div>
          <img src={nft.thumbnail} aria-labelledby={formatText(nft.name)} alt='' />
        </div>
        <div className='overlay'>
          <div>
            <div id={formatText(nft.name)}>{nft.name}</div>
            <div className='supporting text'>
              {nft.siblings} siblings
            </div>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default NftCardWithBlurEffect
