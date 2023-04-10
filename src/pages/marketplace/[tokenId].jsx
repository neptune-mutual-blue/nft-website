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
import { NftDetails } from '@/views/NftDetails'

export async function getStaticProps (context) {
  const [nftDetailsResponse, premiumNftsResponse, videoResponse] = await Promise.all([NftApi.getNftDetails(context.params.tokenId), NftApi.premiumNfts(), resourcesVideoData()])

  return {
    props: {
      nftDetails: nftDetailsResponse.data[0],
      premiumNfts: premiumNftsResponse.data,
      videos: videoResponse.docs
    },
    revalidate: 60 * 60 // one hour
  }
}

export async function getStaticPaths () {
  return { paths: [], fallback: 'blocking' }
}

const NftDetailsPage = ({ nftDetails, premiumNfts, videos }) => {
  const router = useRouter()

  const logViewExecuted = useRef(false)

  const logView = useCallback(async () => {
    // This is because react in strict mode, executes useEffect twice.
    if (logViewExecuted.current === false) {
      logViewExecuted.current = true

      try {
        const { tokenId } = router.query
        await NftApi.logView(tokenId)
      } catch (err) {
        console.error(err)
      }
    }
  }, [router.query])

  useEffect(() => {
    logView()
  }, [logView])

  if (!nftDetails) {
    return <></>
  }

  return (
    <>
      <Seo title={`${nftDetails?.name} / Neptune Mutual`} ogImage='/assets/images/meta/nft-detail.png' ogImageAlt={`Neptune Mutual NFT ${nftDetails?.name}`} />

      <BaseLayout videos={videos}>
        <NftDetails nftDetails={nftDetails} premiumNfts={premiumNfts} />
      </BaseLayout>
    </>
  )
}

export default NftDetailsPage
