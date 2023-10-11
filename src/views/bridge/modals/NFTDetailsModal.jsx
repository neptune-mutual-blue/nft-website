import { Modal } from '@/components/Modal/Modal'
import NftImageWithExpand from '@/components/NftImageWithExpand'
import { Icon } from '@/elements/Icon'

const mockNft = {
  tokenId: '100050',
  role: 'Guardian',
  level: 1,
  siblings: 1000,
  stage: 'Selection',
  tokenOwner: null,
  name: 'Delphinus #100050',
  category: 'Delphinus',
  nickname: 'Acutus Quattuor',
  family: 'Delphinus',
  views: '0',
  likes: '0',
  wantToMint: '0',
  description: 'The stellar dolphin guardian empowered by the heavens',
  url: 'https://nft.neptunemutual.net/metadata/100050.json',
  image: 'https://nft.neptunemutual.net/images/100050.png',
  thumbnail: 'https://nft.neptunemutual.net/thumbnails/100050.webp',
  cover: 'https://nft.neptunemutual.net/covers/100050.webp',
  externalUrl: 'https://nft.neptunemutual.com/marketplace/100050',
  datePublished: '1682122555663',
  soulbound: false,
  attributes: [
    {
      value: 'The Atlantic Tides',
      traitType: 'Background'
    },
    {
      value: 'Abyss Anthracite Delphinus',
      traitType: 'Guardian'
    },
    {
      value: 'Ocean Sunburst Tail',
      traitType: 'Tail'
    },
    {
      value: 'Golden Swirl Flippers',
      traitType: 'Flippers'
    },
    {
      value: 'Reef Guardian  Armor',
      traitType: 'Armor'
    },
    {
      value: 'Mercurian Helm',
      traitType: 'Helm'
    },
    {
      value: 'Selection',
      traitType: 'Type'
    },
    {
      value: 'Acutus Quattuor',
      traitType: 'Nickname'
    },
    {
      value: 'Delphinus',
      traitType: 'Family'
    },
    {
      value: 1000,
      traitType: 'Siblings'
    },
    {
      value: 5,
      maxValue: 10,
      traitType: 'Rarity'
    },
    {
      value: 1,
      maxValue: 7,
      traitType: 'Level'
    }
  ],
  activities: []
}
const NFTDetailsModal = ({ open, close }) => {
  return (
    <Modal
      className='nft details modal'
      visible={open}
      setVisible={close}
    >
      <button className='close'>
        <Icon variant='x-close' size='xl' />
      </button>

      <h3>
        NFT Details
      </h3>

      <div className='image and details'>
        <NftImageWithExpand nft={mockNft} />

        <div className='details'>
          <div className='detail card'>
            <p className='title'>Name</p>
            <div className='value'>
              {mockNft.name}
            </div>
          </div>

          <div className='detail card'>
            <p className='title'>Token ID</p>
            <div className='value address'>
              <p>{mockNft.tokenId}</p>
              <button>
                <Icon variant='copy-01' size='lg' />
              </button>
            </div>
          </div>

          <div className='detail card'>
            <p className='title'>Original Chain</p>
            <div className='value chain'>
              <Icon variant='ethereum-round-blue' size='xl' />
              <p>{mockNft.tokenId}</p>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  )
}

export { NFTDetailsModal }
