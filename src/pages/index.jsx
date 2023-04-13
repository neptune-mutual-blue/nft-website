import { useEffect } from 'react'

import Script from 'next/script'

import Seo from '@/components/Seo/Seo'
import { BaseLayout } from '@/layouts/BaseLayout'
import { NftApi } from '@/service/nft-api'
import { resourcesVideoData } from '@/service/video-api'
import { Home } from '@/views/Home'

export async function getStaticProps () {
  const [
    knowTheCharactersResponse,
    mostViewedNftsResponse,
    regularNftsResponse,
    premiumNftsResponse,
    videoResponse
  ] = await Promise.all([
    NftApi.knowTheCharacters(),
    NftApi.mostViewedNfts(),
    NftApi.regularNfts(),
    NftApi.premiumNfts(),
    resourcesVideoData()
  ])

  knowTheCharactersResponse.data.sort((a, b) => {
    if (!a.level) {
      return -1
    }

    if (!b.level) {
      return 1
    }
    return b.level - a.level
  })

  const charactersByPage = []

  for (let i = 0; i < knowTheCharactersResponse.data.length; i += 5) {
    charactersByPage.push(knowTheCharactersResponse.data.slice(i, i + 5))
  }
  return {
    props: {
      ssg: {
        charactersByPage,
        mostViewedNfts: mostViewedNftsResponse.data,
        regularNfts: regularNftsResponse.data,
        premiumNfts: premiumNftsResponse.data
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
