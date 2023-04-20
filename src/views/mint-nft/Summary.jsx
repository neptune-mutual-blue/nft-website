import React from 'react'

import { Tags } from '@/components/Tags/Tags'

export const Summary = () => {
  return (
    <div className='nft minting summary'>
      <h2 className='title'>Summary</h2>
      <div className='summary table'>
        <div className='row header'>
          <div>Level</div>
          <div>Guardian/Beast</div>
          <div>Policy Purchase</div>
          <div>Added Liquidity</div>
        </div>

        <div className='row'>
          <div>
            <Tags
              tags={[
                {
                  id: '1',
                  slug: '1',
                  text: 'Level 1',
                  color: 'level1'
                }
              ]}
            />
          </div>
          <div className='value'>Delphinus/Sabersquatch</div>
          <div>$2,500</div>
          <div>$500</div>
        </div>
        <div className='row'>
          <div>
            <Tags
              tags={[
                {
                  id: '1',
                  slug: '1',
                  text: 'Level 2',
                  color: 'level2'
                }
              ]}
            />
          </div>
          <div className='value'>Epic Delphinus/Diabolic Sabersquatch</div>
          <div>$10,000</div>
          <div>$5,000</div>
        </div>
        <div className='row'>
          <div>
            <Tags
              tags={[
                {
                  id: '1',
                  slug: '1',
                  text: 'Level 3',
                  color: 'level3'
                }
              ]}
            />
          </div>
          <div className='value'>Aquavallo/Gargantuworm</div>
          <div>$50,000</div>
          <div>$10,000</div>
        </div>
        <div className='row'>
          <div>
            <Tags
              tags={[
                {
                  id: '1',
                  slug: '1',
                  text: 'Level 4',
                  color: 'level4'
                }
              ]}
            />
          </div>
          <div className='value'>Epic Aquavallo/Diabolic Gargantuworm</div>
          <div>$100,000</div>
          <div>$50,000</div>
        </div>
        <div className='row'>
          <div>
            <Tags
              tags={[
                {
                  id: '1',
                  slug: '1',
                  text: 'Level 5',
                  color: 'level5'
                }
              ]}
            />
          </div>
          <div className='value'>Salacia/Merman Serpent</div>
          <div>$1,000,000</div>
          <div>$100,000</div>
        </div>
        <div className='row'>
          <div>
            <Tags
              tags={[
                {
                  id: '1',
                  slug: '1',
                  text: 'Level 6',
                  color: 'level6'
                }
              ]}
            />
          </div>
          <div className='value'>Epic Salacia/Diabolic Merman Serpent</div>
          <div>$1,500,000</div>
          <div>$250,000</div>
        </div>
        <div className='row'>
          <div>
            <Tags
              tags={[
                {
                  id: '1',
                  slug: '1',
                  text: 'Level 7',
                  color: 'level7'
                }
              ]}
            />
          </div>
          <div className='value'>Legendary Neptune</div>
          <div>$2,5000,000</div>
          <div>$500,000</div>
        </div>
      </div>
    </div>
  )
}
