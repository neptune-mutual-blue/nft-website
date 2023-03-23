import { Slider } from '@/components/Slider/Slider'

const RegularNfts = ({ regularNfts }) => {
  return (
    <div className='regular nfts'>
      <h2>Regular NFTs</h2>
      <Slider gap={24}>
        {
        regularNfts.map((character) => {
          return (
            <div key={character.name} className='character details with slider'>
              <div>
                <img src={character.image} alt={character.name} />
              </div>

              <div className='character name'>{character.name}</div>
              <div className='supporting text'>{character.siblings} siblings</div>
            </div>
          )
        })
      }
      </Slider>
    </div>
  )
}

export { RegularNfts }
