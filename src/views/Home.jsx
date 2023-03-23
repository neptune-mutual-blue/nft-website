import { Hero } from '@/views/home/Hero'
import { KnowTheCharacters } from '@/views/home/KnowTheCharacters'
import { MostViewedNfts } from '@/views/home/MostViewedNfts'
import { PremiumNfts } from '@/views/home/PremiumNfts'
import { RegularNfts } from '@/views/home/RegularNfts'

const Home = ({ ssg }) => {
  return (
    <div className='home page'>
      <Hero />

      <section className='dashboard'>
        <KnowTheCharacters charactersByPage={ssg.charactersByPage} />
      </section>

      <section className='nft showcase'>
        <h2>Premium NFTs</h2>

        <div className='content'>
          <div>
            <PremiumNfts premiumNfts={ssg.premiumNfts} />
            <RegularNfts regularNfts={ssg.regularNfts} />
          </div>
          <div><MostViewedNfts mostViewedNfts={ssg.mostViewedNfts} /></div>
        </div>
      </section>
    </div>
  )
}

export { Home }
