import { BaseLayout } from '@/layouts/BaseLayout'
import { resourcesVideoData } from '@/service/video-api'
import MerkleProofView from '@/views/merkle-proof/MerkleProofView'

export async function getServerSideProps () {
  try {
    const [videoResponse] = await Promise.all([resourcesVideoData()])

    return {
      props: {
        videos: videoResponse
      }
    }
  } catch (error) {
    return {
      notFound: true
    }
  }
}

const MintNftPage = ({ videos }) => {
  return (
    <>
      {/* <Seo
        ogURL={'/marketplace/' + nftDetails.tokenId + '/'}
        title='NFT Minting Levels / Neptune Mutual'
        ogImage='/assets/images/meta/nft-detail.png'
        ogImageAlt={`Neptune Mutual NFT ${nftDetails?.name}`}
        description='Dive deeper to get the insights relating to multiple levels with our view-level page. Make informed decisions to maximize the value of your NFT investments.'
      /> */}

      <BaseLayout videos={videos}>
        <MerkleProofView />
      </BaseLayout>
    </>
  )
}

export default MintNftPage
