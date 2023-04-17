import Seo from '@/components/Seo/Seo'
import { BaseLayout } from '@/layouts/BaseLayout'
import { resourcesVideoData } from '@/service/video-api'
import Error404 from '@/views/404'

export async function getStaticProps () {
  const videoData = await resourcesVideoData()

  return {
    props: {
      videos: videoData
    },
    revalidate: 60 * 60 // one hour
  }
}

const PageNotFound = (props) => {
  return (
    <>
      <Seo
        ogURL='/404'
        title='Page Not Found / Neptune Mutual'
        ogImage='/assets/images/meta/home.png'
        ogImageAlt='Neptune Mutual NFT 404'
        description='The page you requested either does not exist or has been deleted'
      />

      <BaseLayout videos={props.videos}>
        <Error404 />
      </BaseLayout>
    </>
  )
}

export default PageNotFound
