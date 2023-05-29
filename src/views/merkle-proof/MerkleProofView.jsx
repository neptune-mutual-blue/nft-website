import { useState } from 'react'

import { Breadcrumb } from '@/components/Breadcrumb/Breadcrumb'
import { Button } from '@/components/Button/Button'
import { ConnectWallet } from '@/components/ConnectWallet/ConnectWallet'
import Switch from '@/components/Switch/Switch'

const MerkleProofView = () => {
  const crumbs = [
    {
      link: '/',
      name: 'NFT Home'
    },
    {
      link: '/marketplace/',
      name: 'NFT Marketplace'
    },
    {
      link: '/marketplace/' + 123 + '/',
      name: 'Dummy NFT'
    },
    {
      link: '#',
      name: 'Minting Levels'
    },
    {
      link: '#',
      name: 'Merkle Proof'
    }
  ]

  const [showLiveData, setShowLiveData] = useState(false)

  return (
    <section className='merkle proof view'>
      <div className='breadcrumb and connect wallet'>
        <Breadcrumb items={crumbs} />
        <ConnectWallet />
      </div>
      <div className='table'>
        <div className='header'>
          <div className='title and indicator'>
            <h1>Merkle Proof</h1>
            <div className='indicator'>
              <div className='dot' />
              {showLiveData ? 'Live' : 'Stale'}
            </div>
          </div>

          <Switch
            label='Show Live Data' value={showLiveData} onChange={(value) => {
              setShowLiveData(value)
            }}
          />
        </div>
        <div className='last updated'>
          Last Updated On: A Few Days Ago
        </div>

        <div className='content'>
          <div>
            <div className='row heading'>
              <div>Account</div>
              <div>Policy</div>
              <div>Liquidity</div>
              <div>Points</div>
              <div>Proof</div>
            </div>

            <div className='row'>
              <div className='address'>Oxbafe876c70a845061c92e535314e8aae8f6952be</div>
              <div>$20,393.45</div>
              <div>$12,500</div>
              <div className='points'>125</div>
              <div className='view-proof'>
                <button>View Proof</button>
              </div>
            </div>
            <div className='row'>
              <div className='address'>Oxbafe876c70a845061c92e535314e8aae8f6952be</div>
              <div>$20,393.45</div>
              <div>$12,500</div>
              <div className='points'>125</div>
              <div className='view-proof'>
                <button>View Proof</button>
              </div>
            </div>
            <div className='row'>
              <div className='address'>Oxbafe876c70a845061c92e535314e8aae8f6952be</div>
              <div>$20,393.45</div>
              <div>$12,500</div>
              <div className='points'>125</div>
              <div className='view-proof'>
                <button>View Proof</button>
              </div>
            </div>
            <div className='row'>
              <div className='address'>Oxbafe876c70a845061c92e535314e8aae8f6952be</div>
              <div>$20,393.45</div>
              <div>$12,500</div>
              <div className='points'>125</div>
              <div className='view-proof'>
                <button>View Proof</button>
              </div>
            </div>
            <div className='row'>
              <div className='address'>Oxbafe876c70a845061c92e535314e8aae8f6952be</div>
              <div>$20,393.45</div>
              <div>$12,500</div>
              <div className='points'>125</div>
              <div className='view-proof'>
                <button>View Proof</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='proof'>
        <div className='root'>
          <div className='label'>Merkle Proof:</div>
          <div className='value'>0×61207175696362062726f7762066678206a756d707320676657220746800</div>
        </div>
        <Button size='xl'>Set Merkle Root</Button>
      </div>
    </section>
  )
}

export default MerkleProofView
