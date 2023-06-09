// import { Achievements } from '@/views/home/Achievements'
// import { Activities } from '@/views/home/Activities'
import { Hero } from '@/views/home/Hero'
// import { KnowTheCharacters } from '@/views/home/KnowTheCharacters'
// import { Leaderboard } from '@/views/home/Leaderboard'
import { MostViewedNfts } from '@/views/home/MostViewedNfts'
import { PremiumNfts } from '@/views/home/PremiumNfts'
import { RegularNfts } from '@/views/home/RegularNfts'

const Home = ({ ssg }) => {
  return (
    <>
      <Hero />
      <div className='home page'>

        {/* <section className='dashboard'>
          <KnowTheCharacters charactersByPage={ssg.charactersByPage} />
        </section> */}

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

        {/* <section className='activities'>
          <Activities />

          <div className='leaderboard achievements'>
            <Leaderboard />
            <Achievements />
          </div>
        </section> */}
      </div>
    </>
  )
}

export { Home }
