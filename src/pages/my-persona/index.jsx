import React from 'react'

import Seo from '@/components/Seo/Seo'
import { BaseLayout } from '@/layouts/BaseLayout'
import { NftApi } from '@/service/nft-api'
import { resourcesVideoData } from '@/service/video-api'
import MyPersona from '@/views/my-persona/MyPersona'

export async function getStaticProps () {
  try {
    const [charactersResponse, videoResponse] = await Promise.all([NftApi.knowTheCharacters(), resourcesVideoData()])

    return {
      props: {
        videos: videoResponse,
        characters: charactersResponse.data
      },
      revalidate: 60 * 60 // one hour
    }
  } catch (error) {
    return {
      notFound: true
    }
  }
}

const MyPersonaPage = ({ videos, characters }) => {
  return (
    <>
      <Seo
        ogURL='/my-persona/'
        title='My Persona / Neptune Mutual'
        ogImage='/assets/images/meta/nft-detail.png'
        ogImageAlt='Neptune Mutual NFT Persona'
        description='Dive deeper to get the insights relating to multiple levels with our view-level page. Make informed decisions to maximize the value of your NFT investments.'
      />

      <BaseLayout videos={videos}>
        <MyPersona characters={characters} />
      </BaseLayout>
    </>

  )
}

export default MyPersonaPage
