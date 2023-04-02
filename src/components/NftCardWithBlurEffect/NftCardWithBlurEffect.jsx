import { getMarketplaceFiltersHref } from '@/utils/nft'
import Link from 'next/link'

const NftCardWithBlurEffect = (props) => {
  const { nft, className } = props

  return (
    <div className={'blur effect character details' + (className ? ' ' + className : '')}>
      <Link
        key={nft.name}
        href={getMarketplaceFiltersHref(nft)}
      >
        <div>
          <img src={nft.thumbnail} alt={nft.name} />
        </div>
        <div className='overlay'>
          <div>
            <div>{nft.name}</div>
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
