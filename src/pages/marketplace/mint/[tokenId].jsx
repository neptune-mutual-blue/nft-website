import { NftApi } from '@/service/nft-api'
import { MintNft } from '@/views/MintNft'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useRef } from 'react'

export async function getStaticProps (context) {
  const [nftDetailsResponse, premiumNftsResponse, mintingLevelResponse] = await Promise.all([NftApi.getNftDetails(context.params.tokenId), NftApi.premiumNfts(), NftApi.mintingLevels()])

  return {
    props: {
      nftDetails: nftDetailsResponse.data[0],
      premiumNfts: premiumNftsResponse.data,
      mintingLevels: mintingLevelResponse.data
    },
    revalidate: 60 * 60 // one hour
  }
}

export async function getStaticPaths () {
  return { paths: [], fallback: 'blocking' }
}

const MintNftPage = ({ nftDetails, premiumNfts, mintingLevels }) => {
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

  if (!nftDetails) {
    return <></>
  }

  return (
    <MintNft nftDetails={nftDetails} premiumNfts={premiumNfts} mintingLevels={mintingLevels} />
  )
}

export default MintNftPage
