
import { Breadcrumb } from '@/components/Breadcrumb/Breadcrumb'
import { Button } from '@/components/Button/Button'
import NftCardWithBlurEffect from '@/components/NftCardWithBlurEffect/NftCardWithBlurEffect'
import { Tags } from '@/components/Tags/Tags'
import { Icon } from '@/elements/Icon'

const NftDetails = ({ nftDetails, premiumNfts }) => {
  const crumbs = [
    {
      link: '/',
      name: 'NFT Home'
    },
    {
      link: '/marketplace/',
      name: 'NFT Marketplace'
    },
    {
      link: '#',
      name: nftDetails.family
    }
  ]

  return (
    <div className='nft details page'>
      <section className='hero'>
        <Breadcrumb items={crumbs} />

        <div className='content grid'>
          <div className='image'>
            <img src={nftDetails.image} alt={nftDetails.name} />

            <div className='fullscreen icon'>
              <Icon variant='expand-01' size='lg' />
            </div>
          </div>
          <div>
            <div className='mint'>
              {nftDetails.level && (
                <Tags
                  tags={[
                    {
                      id: '1',
                      slug: '1',
                      text: `Level ${nftDetails.level}`,
                      color: 'level' + nftDetails.level
                    }
                  ]}
                />
              )}
              <div className='nickname' data-color={'level' + nftDetails.level}>
                {nftDetails.nickname}
              </div>
              <div className='character name'>{nftDetails.name}</div>
              <div className='siblings and stage'>
                <div>{nftDetails.siblings} siblings</div>
                <div>
                  <Tags
                    tags={[
                      {
                        id: '1',
                        slug: '1',
                        text: nftDetails.stage,
                        color: 'nft-stage'
                      }
                    ]}
                  />
                </div>
              </div>
              <div className='minting btn'>
                <Button type='button' size='2xl'>Mint This NFT for Free</Button>
                <div className='supporting text'>
                  {nftDetails.wantToMint} people want to mint this.
                </div>
              </div>

              <div className='like and share'>
                <div className='like btn'>
                  <Icon variant='heart' size='lg' />
                  1,024
                </div>
                <div className='share btn'>
                  <Icon variant='share-01' size='lg' />
                  Share
                </div>
              </div>
            </div>
          </div>
          <div className='more details'>
            <div className='description'>
              <h3>Description</h3>
              <div className='text'>{nftDetails.description}</div>
            </div>

            <div className='properties'>
              <h3>Properties</h3>
              <div className='table'>
                <div className='row'>
                  <div>Property</div>
                  <div>Value</div>
                </div>
                {
              nftDetails.attributes.map((attr) => (
                <div className='row' key={attr.traitType}>
                  <div>{attr.traitType}</div>
                  <div className='value'>{attr.value}</div>
                </div>
              ))
            }
              </div>
            </div>

          </div>
        </div>

        <div className='nfts you may like'>
          <h3>NFTs You May Like</h3>
          <div className='nft characters'>
            {premiumNfts.slice(0, 6).map(nft => <NftCardWithBlurEffect key={nft.name} nft={nft} />)}
          </div>
        </div>
      </section>
    </div>

  )
}

export { NftDetails }
