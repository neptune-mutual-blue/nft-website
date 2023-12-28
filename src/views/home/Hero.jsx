import { HeaderSection } from '@/components/HeaderSection/HeaderSection'
import { HeroImage } from '@/views/home/HeroImage'

const Hero = () => {
  return (
    <div className='home hero container'>
      <HeaderSection
        color='basic'
        alignment='center'
        heading='Discover Neptune Mutual NFTs'
        secondary={{
          text: 'My Account',
          href: '#my-account',
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
        <div className='full width container'>
          <HeroImage />
        </div>
      </div>
    </div>
  )
}

export { Hero }
