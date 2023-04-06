import { NftApi } from '@/service/nft-api'
import { NftDetails } from '@/views/NftDetails'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useRef } from 'react'

export async function getStaticProps (context) {
  const [nftDetailsResponse, premiumNftsResponse] = await Promise.all([NftApi.getNftDetails(context.params.tokenId), NftApi.premiumNfts()])

  return {
    props: {
      nftDetails: nftDetailsResponse.data[0],
      premiumNfts: premiumNftsResponse.data
    },
    revalidate: 60 * 60 // one hour
  }
}

export async function getStaticPaths () {
  return { paths: [], fallback: 'blocking' }
}

const NftDetailsPage = ({ nftDetails, premiumNfts }) => {
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
    <NftDetails nftDetails={nftDetails} premiumNfts={premiumNfts} />
  )
}

export default NftDetailsPage
