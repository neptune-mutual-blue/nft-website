import { Tags } from '@/components/Tags/Tags'
import { Icon } from '@/elements/Icon'

// @todo: remove mock images from 'public/assets/images/test' after api implementation
const data = [
  {
    avatar: '/assets/images/test/avatar1.png',
    name: 'DasjRollerCoaster',
    achievement: 'Reached Level 7!',
    level: 7,
    tags: [{ color: 'level7', name: 'L7' }]
  },
  {
    avatar: '/assets/images/test/avatar1.png',
    name: 'Purple Orchid Isomorphic Galactic Nebula',
    achievement: 'Reached Level 5!',
    level: 6,
    tags: [{ color: 'level6', name: 'L6' }]
  },
  {
    avatar: '/assets/images/test/avatar1.png',
    name: 'Yano',
    achievement: 'Reached Level 6!',
    level: 1,
    tags: [{ color: 'level1', name: 'L1' }]
  },
  {
    avatar: '/assets/images/test/avatar1.png',
    name: 'I Am Batman',
    achievement: 'Reached Level 1!',
    level: 7,
    tags: [{ color: 'level7', name: 'L7' }]
  }
]

const Achievements = () => {
  return (
    <>
      <div className='achievements container'>
        <h2>Achievements</h2>

        <div className='achievements list'>
          {
            data.map(({ avatar, name, tags, achievement }, idx) => (
              <div className='item' key={idx}>
                <img src={avatar} alt={`${name}-avatar`} />

                <div className='name and achievement'>
                  <p className='name'>{name}</p>
                  <p className='achievement'>{achievement}</p>
                </div>

                <div className='level tag'>
                  <Tags tags={tags} />
                </div>
              </div>
            ))
          }
        </div>
      </div>

      <a href='#' className='set your persona'>
        <div className='text'>
          <span>Set your persona</span>
          <p>Are you a Guardian or a Beast?</p>
        </div>
        <Icon variant='arrow-right' />
      </a>
    </>
  )
}

export { Achievements }
