import Seo from '@/components/Seo/Seo'
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
      <Seo
        ogURL='/marketplace/minting-levels/'
        title='NFT Merkle Proof / Neptune Mutual'
        ogImage='/assets/images/meta/minting-level.png'
        ogImageAlt='Neptune Mutual NFT Minting Level'
        description='Dive deeper to get the insights relating to multiple levels with our view-level page. Make informed decisions to maximize the value of your NFT investments.'
      />

      <BaseLayout videos={videos}>
        <MerkleProofView />
      </BaseLayout>
    </>
  )
}

export default MintNftPage
