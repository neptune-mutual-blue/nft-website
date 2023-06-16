import { Tags } from '@/components/Tags/Tags'
import { truncateAddress } from '@/utils/nft'

// @todo: remove mock images from 'public/assets/images/test' after api implementation
const data = [
  {
    avatar: '/assets/images/test/avatar1.png',
    name: 'DasjRollerCoaster',
    address: truncateAddress('0x03b4658fA53bdaC6cedd7C4Fec3E41Ca9777dB84'),
    level: 7,
    tags: [{ color: 'level7', name: 'L7' }]
  },
  {
    avatar: '/assets/images/test/avatar1.png',
    name: 'Purple Orchid Isomorphic Galactic Nebula',
    address: truncateAddress('0x03b4658fA53bdaC6cedd7C4Fec3E41Ca9777dB84'),
    level: 6,
    tags: [{ color: 'level6', name: 'L6' }]
  },
  {
    avatar: '/assets/images/test/avatar1.png',
    name: 'Yano',
    address: truncateAddress('0x03b4658fA53bdaC6cedd7C4Fec3E41Ca9777dB84'),
    level: 1,
    tags: [{ color: 'level1', name: 'L1' }]
  },
  {
    avatar: '/assets/images/test/avatar1.png',
    name: 'I Am Batman',
    address: truncateAddress('0x03b4658fA53bdaC6cedd7C4Fec3E41Ca9777dB84'),
    level: 7,
    tags: [{ color: 'level7', name: 'L7' }]
  },
  {
    avatar: '/assets/images/test/avatar1.png',
    name: 'Giant Shining Light Tabular Structure',
    address: truncateAddress('0x03b4658fA53bdaC6cedd7C4Fec3E41Ca9777dB84'),
    level: 3,
    tags: [{ color: 'level3', name: 'L3' }]
  }
]

const Leaderboard = () => {
  return (
    <div className='leaderboard container'>
      <h2>Leaderboard</h2>

      <div className='leaderboard list'>
        {
          data.map(({ avatar, name, tags, address }, idx) => {
            return (
              <div className='item' key={idx}>
                <img src={avatar} alt={`${name}-avatar`} />

                <div className='name and address'>
                  <p className='name'>{name}</p>
                  <p className='address'>{address}</p>
                </div>

                <div className='level tag'>
                  <Tags tags={tags} />
                </div>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export { Leaderboard }
