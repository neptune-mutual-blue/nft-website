import React, {
  useMemo,
  useState
} from 'react'

import Link from 'next/link'
import { useRouter } from 'next/router'

import { Breadcrumb } from '@/components/Breadcrumb/Breadcrumb'
import { Button } from '@/components/Button/Button'
import { ConnectWallet } from '@/components/ConnectWallet/ConnectWallet'
import { EvmErrorModal } from '@/components/EvmError/EvmErrorModal'
import { LoaderPopup } from '@/components/LoaderPopup/LoaderPopup'
import { NftCard } from '@/components/NftCard/NftCard'
import { bridgeConfig } from '@/config/bridge'
import { AppConstants } from '@/constants/AppConstants'
import { Icon } from '@/elements/Icon'
import useNftBridge from '@/hooks/actions/useNftBridge'
import { useUserNfts } from '@/hooks/data/useUserNfts'
import { imageOrigin } from '@/services/marketplace-api'
import ChainSelector from '@/views/bridge/ChainSelector'
import { BridgingResults } from '@/views/bridge/modals/BridgingResults'
import { ImportNFT } from '@/views/bridge/modals/ImportNFT'
import { NFTDetailsModal } from '@/views/bridge/modals/NFTDetailsModal'
import { useWeb3React } from '@web3-react/core'

const crumbs = [
  {
    link: '/',
    name: 'NFT Home'
  },
  {
    link: '/my-collection',
    name: 'My NFT Collection'
  },
  {
    link: '#',
    name: 'NFT Bridge'
  }
]

const NftBridge = () => {
  const { account, active } = useWeb3React()

  const { userNFTs } = useUserNfts(account)

  const [info, setInfo] = useState()

  const nonSoulboundNFTs = userNFTs.filter(nft => { return !nft.soulbound })

  const [selectedNfts, setSelectedNfts] = useState([])

  const [showImport, setShowImport] = useState(false)

  const [sourceChainId, setSourceChainId] = useState(AppConstants.NETWORK)

  const currentNetwork = bridgeConfig[sourceChainId]

  const otherNetworks = Object.values(bridgeConfig).filter((value) => { return value.chainId !== currentNetwork.chainId && value.isTestnet === currentNetwork.isTestnet })

  const initialDestinationNetwork = otherNetworks.length > 0 ? otherNetworks[0] : currentNetwork

  const [destinationChainId, setDestinationChainId] = useState(initialDestinationNetwork.chainId)

  // Stage 1: Source & Destination Selection
  // Stage 2: Bridge
  const [stage, setStage] = useState(1)

  const {
    balance,
    fees,
    isApproved,
    approving,
    approveForAll,
    sending,
    sendNfts,
    error,
    fetchingFees,
    setError,
    transaction
  } = useNftBridge(selectedNfts, destinationChainId, currentNetwork.neptuneLegends || currentNetwork.lzONft721, currentNetwork.lzProxyONft || currentNetwork.lzONft721)

  const [searchText, setSearchText] = useState('')

  const filteredNfts = useMemo(() => {
    const searchQuery = searchText.toLowerCase().trim()

    const nfts = nonSoulboundNFTs.filter((nft) => { return nft?.tokenOwner?.[0]?.chainId?.toString() === sourceChainId.toString() })

    if (!searchQuery) { return nfts }

    return nfts.filter((nft) => { return nft.tokenId.toString().includes(searchQuery) || nft.name.toLowerCase().includes(searchQuery) || nft.nickname.toLowerCase().includes(searchQuery) })
  }, [searchText, nonSoulboundNFTs, sourceChainId])

  const router = useRouter()

  return (
    <div className='nft bridge page'>
      <div className='inner content'>

        <div className='breadcrumb and connect wallet'>
          <Breadcrumb items={crumbs} />
          {stage === 2 && (
            <ConnectWallet chainId={sourceChainId} />
          )}
        </div>

        <EvmErrorModal
          open={error !== ''}
          setOpen={() => {
            setError('')
          }}
          onOK={() => {
            sendNfts(true)
          }}
          error={error}
        />

        {stage === 1 && (
          <div className='bridge selection'>
            <div>
              <img src='/assets/images/bridge/display.webp' alt='Salacia' />
            </div>
            <div>
              <div className='selectors'>
                <h1>Move NFTs across different blockchain networks.</h1>
                <div className='selection box'>
                  <div className='source selection container'>
                    <div className='label'>Departure Chain</div>
                    <ChainSelector selectedChain={sourceChainId} setSelectedChain={setSourceChainId} />
                  </div>
                  <div className='destination selection container'>
                    <div className='label'>Destination Chain</div>
                    <ChainSelector selectedChain={destinationChainId} setSelectedChain={setDestinationChainId} />
                  </div>

                  <div className='vertical switch'>
                    <Icon variant='switch-vertical-02' size='lg' />
                  </div>
                </div>
                <Button
                  type='primary' size='2xl' onClick={() => {
                    setStage(2)
                  }}
                >Proceed to Bridging
                </Button>
              </div>
            </div>
          </div>
        )}

        {stage === 2 && (
          <div className='bridge section'>
            <section className='collection selection'>
              <div className='title'>
                <div className='left'>
                  Your NFTs on
                  <ChainSelector selectedChain={sourceChainId} setSelectedChain={setSourceChainId} />
                </div>
                <div className='right'>
                  <div className='search wrapper'>
                    <Icon size='lg' variant='search-lg' />
                    <label htmlFor='search' className='label-hidden'>Search </label>
                    <input
                      value={searchText}
                      onChange={(e) => {
                        setSearchText(e.target.value)
                      }}
                      id='search'
                      placeholder='Search'
                      className='search input'
                      aria-label='Search'
                    />
                  </div>

                </div>

              </div>

              <div className='actions'>
                <Link href='/my-collection/bridge/transactions'>Transaction History</Link>
                <Button
                  variant='secondary-gray' onClick={() => {
                    setShowImport(true)
                  }}
                >
                  <Icon variant='plus' />
                </Button>
              </div>

              <NFTDetailsModal
                nft={info} open={!!info} close={() => {
                  setInfo(undefined)
                }}
              />

              <ImportNFT
                open={showImport}
                close={() => {
                  setShowImport(false)
                }}
              />

              <BridgingResults
                departureChainId={sourceChainId}
                destinationChainId={destinationChainId}
                open={!!transaction}
                close={() => {
                  router.push('/my-collection/bridge/transactions')
                }}
                transaction={transaction}
                nfts={nonSoulboundNFTs.filter((nft) => { return selectedNfts.includes(nft.tokenId) })}
              />

              <LoaderPopup
                title='Bridging NFTs'
                visible={sending}
              />

              <div className='nft selection'>
                <div className='nft list'>
                  {filteredNfts.map((nft) => {
                    return (
                      <NftCard
                        onInfo={() => {
                          setInfo(
                            nft
                          )
                        }}
                        selectable
                        checked={selectedNfts.includes(nft.tokenId)}
                        setChecked={(selected) => {
                          if (selected) {
                            setSelectedNfts([...selectedNfts, nft.tokenId])
                          } else {
                            setSelectedNfts(selectedNfts.filter(x => { return x !== nft.tokenId }))
                          }
                        }}
                        key={nft.tokenId}
                        name={nft.nickname}
                        nftId={nft.tokenId}
                        views={nft.views}
                        count={nft.siblings}
                        image={`${imageOrigin}/thumbnails/${nft.tokenId}.webp`}
                        soulbound={nft.soulbound}
                        minted={!!nft.tokenOwner}
                      />
                    )
                  })}
                </div>
                {filteredNfts.length === 0 && (
                  <div className='no nft found'>
                    <img src='/assets/images/bridge/bridge_no_nft_bg.webp' alt='Background NFT' srcset='' />
                    <div className='text'>{active ? 'No NFTs Found' : 'Connect Your Wallet'}</div>
                  </div>
                )}
              </div>
            </section>
            <section className='destination'>
              <div className='chain'>
                Destination
                <ChainSelector selectedChain={destinationChainId} setSelectedChain={setDestinationChainId} />
              </div>

              <input
                id='destination'
                placeholder='Destination Address'
                className='destination input'
                aria-label='Destination Address'
                value={account}
                disabled
              />

              <div className='selected info'>
                <h3>NFTs Selected <span>{selectedNfts.length}/{nonSoulboundNFTs.length}</span></h3>
                <div className='balance'>
                  Balance: <span title={balance.long}>{balance.short}</span>
                </div>
                <div className='fees'>
                  <div>
                    Fees
                  </div>
                  <div title={fees.long}>{fees.short ?? '-'}</div>
                </div>

              </div>
              <Button
                size='2xl'
                disabled={approving || fetchingFees || sending || (isApproved && selectedNfts.length === 0)}
                onClick={() => {
                  if (isApproved) {
                    return sendNfts()
                  }

                  return approveForAll()
                }}
              >
                {isApproved ? sending ? 'Sending...' : 'Send' : approving ? 'Approving...' : 'Approve'}
              </Button>
            </section>
          </div>
        )}

      </div>
    </div>
  )
}

export default NftBridge
