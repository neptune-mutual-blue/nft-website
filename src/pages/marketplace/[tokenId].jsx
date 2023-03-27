import { NftApi } from '@/service/nft-api'
import { NftDetails } from '@/views/NftDetails'

export async function getServerSideProps (context) {
  const [nftDetailsResponse, premiumNftsResponse] = await Promise.all([NftApi.getNftDetails(context.params.tokenId), NftApi.premiumNfts(), NftApi.logView(context.params.tokenId)])

  return {
    props: {
      nftDetails: nftDetailsResponse.data[0],
      premiumNfts: premiumNftsResponse.data
    }
  }
}

const NftDetialsPage = ({ nftDetails, premiumNfts }) => {
  if (!nftDetails) {
    return <></>
  }

  return (
    <NftDetails nftDetails={nftDetails} premiumNfts={premiumNfts} />
  )
}

export default NftDetialsPage
