import { NftApi } from '@/service/nft-api'
import { MintNft } from '@/views/MintNft'

export async function getStaticProps (context) {
  const [nftDetailsResponse, premiumNftsResponse, mintingLevelResponse] = await Promise.all([NftApi.getNftDetails(context.params.tokenId), NftApi.premiumNfts(), NftApi.mintingLevels(), NftApi.logWantToMint(context.params.tokenId)])

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
  if (!nftDetails) {
    return <></>
  }

  return (
    <MintNft nftDetails={nftDetails} premiumNfts={premiumNfts} mintingLevels={mintingLevels} />
  )
}

export default MintNftPage
