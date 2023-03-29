
import { HeaderSection } from '@/components/HeaderSection/HeaderSection'

const Hero = () => {
  return (
    <div className='home hero container'>
      <HeaderSection
        color='basic'
        alignment='center'
        heading='Discover Neptune Mutual NFTs'
        secondary={{
          text: 'View Minting Levels',
          href: '/marketplace/minting-levels',
          size: 'lg'
        }}
        primary={{
          text: 'Access Marketplace',
          href: '/marketplace',
          size: 'lg',
          iconLeading: 'image-indent-left'
        }}
        supportingText={
          <p className='intro'>
            Participate in our cover ecosystem and mint NFTs for free. Select your
            persona and keep unlocking new levels of NFTs.
          </p>
}
      />

      <div className='image container'>
        <img
          className='light only'
          src='/assets/images/hero/nft-light.webp'
          alt='hero image light'
        />
        <img
          className='dark only'
          src='/assets/images/hero/nft-dark.webp'
          alt='hero image dark'
        />
      </div>
    </div>
  )
}

export { Hero }
