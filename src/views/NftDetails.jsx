import { useRouter } from 'next/router'

import { Breadcrumb } from '@/components/Breadcrumb/Breadcrumb'
import { Button } from '@/components/Button/Button'
import { ConnectWallet } from '@/components/ConnectWallet/ConnectWallet'
import { LikeAndShare } from '@/components/LikeAndShare'
import NftCardWithBlurEffect
  from '@/components/NftCardWithBlurEffect/NftCardWithBlurEffect'
import NftImageWithExpand from '@/components/NftImageWithExpand'
import { NftNickname } from '@/components/NftNickname'
import { NftSiblingsAndStage } from '@/components/NftSiblingsAndStage'
import { Tags } from '@/components/Tags/Tags'
import { CustomTooltip } from '@/components/Tooltip/Tooltip'
import { Icon } from '@/elements/Icon'
import { abbreviateAccount } from '@/utils/abbreviate-account'
import { useWeb3React } from '@web3-react/core'

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
      name: nftDetails.name
    }
  ]

  const { active } = useWeb3React()

  const router = useRouter()

  return (

    <div className='nft details page'>
      <section className='hero'>
        <div className='breadcrumb and connect wallet'>
          <Breadcrumb items={crumbs} />
          <ConnectWallet />
        </div>

        <div className='content grid'>
          <NftImageWithExpand nft={nftDetails} isCover />
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
              <NftNickname nft={nftDetails} />
              <h1 className='character name'>{nftDetails.name}</h1>
              <NftSiblingsAndStage nft={nftDetails} />
              <div className='minting btn'>
                <CustomTooltip text='Connect Your Wallet' disabled={active}>
                  <div>
                    <Button
                      type='button' size='xl' disabled={!active} onClick={() => {
                        router.push('/marketplace/mint/' + nftDetails.tokenId)
                      }}
                    >I Want This for Free
                    </Button>
                  </div>
                </CustomTooltip>
                <div className='supporting text'>
                  {nftDetails.wantToMint} people want to mint this.
                </div>
              </div>

              <LikeAndShare nft={nftDetails} />
            </div>
          </div>
          <div className='more details'>
            <div className='description'>
              <h2>Description</h2>
              <div className='text'>{nftDetails.description}</div>
            </div>

            <div className='properties'>
              <h3>Properties</h3>
              <div className='table'>
                <div className='row header'>
                  <div className='type'>Property</div>
                  <div className='value'>Value</div>
                </div>
                {
              nftDetails.attributes.map((attr) => (
                <div className='row' key={attr.traitType}>
                  <div className='type'>{attr.traitType}</div>
                  <div className='value'>{attr.value}</div>
                </div>
              ))
            }
              </div>
            </div>

            <div className='nft links'>
              <h3>Details</h3>

              <div className='links content'>
                <a>
                  <Icon variant='arbitrum-nft' />
                  View on Arbiscan
                  <Icon variant='arrow-right' />
                </a>
                <a href={nftDetails.image} target='_blank'>
                  <Icon variant='eye' />
                  Open Original
                  <Icon variant='arrow-up-right' />
                </a>
              </div>
            </div>

            <div className='activities'>
              <h3>Activities</h3>
              <div className='table'>

                <div className='row'>
                  <div className='type timestamp'>3 months ago</div>
                  <div className='value'><div className='action'>Transferred to</div> <span className='address'>{abbreviateAccount('0x9550e6e02e00698d2f8...3416')}</span></div>
                </div>
                <div className='row'>
                  <div className='type timestamp'>A year ago</div>
                  <div className='value'><div className='action'>Minted to</div> <span className='address'>{abbreviateAccount('0x9550e6e02e00698d2f8...3416')}</span></div>
                </div>
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
