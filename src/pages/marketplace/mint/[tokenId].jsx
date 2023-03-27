import { NftApi } from '@/service/nft-api'
import { MintNft } from '@/views/MintNft'

export async function getServerSideProps (context) {
  const [nftDetailsResponse, mintingLevelResponse] = await Promise.all([NftApi.getNftDetails(context.params.tokenId), NftApi.mintingLevels(), NftApi.logWantToMint(context.params.tokenId)])

  return {
    props: {
      nftDetails: nftDetailsResponse.data[0],
      mintingLevels: mintingLevelResponse.data
    }
  }
}

const MintNftPage = ({ nftDetails, mintingLevels }) => {
  if (!nftDetails) {
    return <></>
  }

  return (
    <MintNft nftDetails={nftDetails} mintingLevels={mintingLevels} />
  )
}

export default MintNftPage
