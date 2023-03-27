import { NftApi } from '@/service/nft-api'
import { MintNft } from '@/views/MintNft'

export async function getServerSideProps (context) {
  const [nftDetailsResponse, mintingLevelCharactersResponse] = await Promise.all([NftApi.getNftDetails(context.params.tokenId), NftApi.mintingLevelCharacters(), NftApi.logWantToMint(context.params.tokenId)])

  return {
    props: {
      nftDetails: nftDetailsResponse.data[0],
      mintingLevelCharacters: mintingLevelCharactersResponse.data
    }
  }
}

const MintNftPage = ({ nftDetails, mintingLevelCharacters }) => {
  console.log(mintingLevelCharacters)
  if (!nftDetails) {
    return <></>
  }

  return (
    <MintNft nftDetails={nftDetails} mintingLevelCharacters={mintingLevelCharacters} />
  )
}

export default MintNftPage
