import {
  useCallback,
  useEffect,
  useRef
} from 'react'

import { useRouter } from 'next/router'

import Seo from '@/components/Seo/Seo'
import { BaseLayout } from '@/layouts/BaseLayout'
import { NftApi } from '@/service/nft-api'
import { resourcesVideoData } from '@/service/video-api'
import { MintNft } from '@/views/MintNft'

export async function getStaticProps (context) {
  try {
    const [nftDetailsResponse, premiumNftsResponse, mintingLevelResponse, videoResponse] = await Promise.all([NftApi.getNftDetails(context.params.tokenId), NftApi.premiumNfts(), NftApi.mintingLevels(), resourcesVideoData()])

    if (nftDetailsResponse.data.length === 0) {
      return {
        notFound: true
      }
    }

    return {
      props: {
        nftDetails: nftDetailsResponse.data[0],
        premiumNfts: premiumNftsResponse.data,
        mintingLevels: mintingLevelResponse.data,
        videos: videoResponse
      },
      revalidate: 60 * 60 // one hour
    }
  } catch (error) {
    return {
      notFound: true
    }
  }
}

export async function getStaticPaths () {
  return { paths: [], fallback: 'blocking' }
}

const MintNftPage = ({ nftDetails, premiumNfts, mintingLevels, videos }) => {
  const router = useRouter()

  const logWantToMintExecuted = useRef(false)

  const logWantToMint = useCallback(async () => {
    // This is because react in strict mode, executes useEffect twice.
    if (logWantToMintExecuted.current === false) {
      logWantToMintExecuted.current = true

      try {
        const { tokenId } = router.query
        await NftApi.logWantToMint(tokenId)
      } catch (err) {
        console.error(err)
      }
    }
  }, [router.query])

  useEffect(() => {
    logWantToMint()
  }, [logWantToMint])

  // if (router.isFallback || !nftDetails) {
  //   return console.log('Page Not Found')
  // }

  if (!nftDetails) {
    return <></>
  }

  return (
    <>
      <Seo
        ogURL={'/marketplace/' + nftDetails.tokenId + '/'}
        title='NFT Minting Levels / Neptune Mutual'
        ogImage='/assets/images/meta/nft-detail.png'
        ogImageAlt={`Neptune Mutual NFT ${nftDetails?.name}`}
        description='Dive deeper to get the insights relating to multiple levels with our view-level page. Make informed decisions to maximize the value of your NFT investments.'
      />

      <BaseLayout videos={videos}>
        <MintNft nftDetails={nftDetails} premiumNfts={premiumNfts} mintingLevels={mintingLevels} />
      </BaseLayout>
    </>
  )
}

export default MintNftPage
