import { Button } from '@/components/Button/Button'
import { HeaderSection } from '@/components/HeaderSection/HeaderSection'

const Hero = () => {
  return (
    <div className='nft marketplace hero container'>
      <HeaderSection
        color='basic'
        alignment='left'
        heading='NFT Marketplace'
        secondary={{
          text: 'View Contract Source Code',
          href: 'https://github.com/neptune-mutual-blue/neptune-mutual-nft',
          target: '_blank',
          rel: 'noopener',
          size: '2xl'
        }}
        primary={{
          text: 'View Minting Levels',
          href: '/',
          size: '2xl'
        }}
        subheading={
          <div className='sub heading'>
            <Button inline type='anchor' variant='link-color' iconLeading='arrow-left' href='/'>Back to Home</Button>
          </div>
}
        supportingText={<p className='sub title'>Participate in our cover ecosystem and mint NFTs for free. Select your persona and keep unlocking new levels.</p>}
      />

    </div>
  )
}

export { Hero }
