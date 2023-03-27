import { NftApi } from '@/service/nft-api'
import { MintNft } from '@/views/MintNft'

export async function getServerSideProps (context) {
  const [nftDetailsResponse, premiumNftsResponse] = await Promise.all([NftApi.getNftDetails(context.params.tokenId), NftApi.premiumNfts(), NftApi.logWantToMint(context.params.tokenId)])

  return {
    props: {
      nftDetails: nftDetailsResponse.data[0],
      premiumNfts: premiumNftsResponse.data
    }
  }
}

const MintNftPage = ({ nftDetails, premiumNfts }) => {
  if (!nftDetails) {
    return <></>
  }

  return (
    <MintNft nftDetails={nftDetails} premiumNfts={premiumNfts} />
  )
}

export default MintNftPage
