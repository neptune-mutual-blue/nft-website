import { NftApi } from '@/service/nft-api'
import { MintNft } from '@/views/MintNft'

export async function getServerSideProps (context) {
  const [nftDetailsResponse] = await Promise.all([NftApi.getNftDetails(context.params.tokenId)])

  return {
    props: {
      nftDetails: nftDetailsResponse.data[0]
    }
  }
}

const MintNftPage = ({ nftDetails }) => {
  if (!nftDetails) {
    return <></>
  }

  return (
    <MintNft nftDetails={nftDetails} />
  )
}

export default MintNftPage
