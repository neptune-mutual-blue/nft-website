import { useEffect } from 'react'

import Script from 'next/script'

import Seo from '@/components/Seo/Seo'
import { BaseLayout } from '@/layouts/BaseLayout'
import { NftApi } from '@/service/nft-api'
import { resourcesVideoData } from '@/service/video-api'
import { Home } from '@/views/Home'

export async function getStaticProps () {
  const [
    mostViewedNftsResponse,
    regularNftsResponse,
    premiumNftsResponse,
    charactersResponse,
    videoResponse
  ] = await Promise.all([
    NftApi.mostViewedNfts(),
    NftApi.regularNfts(),
    NftApi.premiumNfts(),
    NftApi.knowTheCharacters(),
    resourcesVideoData()
  ])

  return {
    props: {
      ssg: {
        mostViewedNfts: mostViewedNftsResponse.data,
        regularNfts: regularNftsResponse.data,
        premiumNfts: premiumNftsResponse.data,
        characters: charactersResponse.data
      },
      videos: videoResponse
    },
    revalidate: 60 * 60 // one hour
  }
}

export default function HomePage ({ ssg, videos }) {
  const initializeSlider = () => {
    window?.initializeSlider?.()
  }

  useEffect(() => {
    initializeSlider()
  }, [])

  return (
    <>
      <Seo
        ogURL='/'
        title='Neptune Mutual NFT'
        ogImage='/assets/images/meta/home.png'
        ogImageAlt='Neptune Mutual NFT Home'
        description='Explore the realm of Neptune Mutual NFTs. Grab this unique set of digital collectibles. Join the NFT revolution today by participating in our cover ecosystem!'
      />

      <BaseLayout videos={videos}>
        <Home ssg={ssg} />
      </BaseLayout>

      {/* eslint-disable-next-line */}
      <Script strategy='beforeInteractive' src='/scripts/slider.js' />
    </>
  )
}
