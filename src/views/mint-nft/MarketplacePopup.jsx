import { Button } from '@/components/Button/Button'
import { Icon } from '@/elements/Icon'
import { networks } from '@/utils/networks'
import { useState } from 'react'

const MarketplacePopup = ({ open, close }) => {
  const [selectedNetwork, setSelectedNetwork] = useState(networks[0])

  if (!open) { return null }

  return (
    <div className='modal container launch-app'>
      <div className='content'>
        <button className='close button' onClick={close}>
          <Icon variant='x-close' size='xs' />
        </button>
        <div className='header'>
          <h2>Choose Your Marketplace</h2>
        </div>

        <div className='options'>
          {
            networks.map((network, i) => {
              const { id, value, link } = network
              return (
                <div className='option' key={i}>
                  <input
                    type='radio'
                    checked={id === selectedNetwork.id}
                    className={id === selectedNetwork.id ? 'checked' : ''}
                    name='application-type'
                    value={value}
                    onChange={() => { return setSelectedNetwork(network) }}
                    id={id}
                  />
                  <label htmlFor={id}>
                    {value} <span className='link'>({link})</span>
                  </label>
                </div>
              )
            })
          }
        </div>
        <div className='buttons container'>
          <Button
            type='anchor'
            classname='accept button'
            href={selectedNetwork.href}
            target='_blank'
            variant='primary'
            size='xl'
          >
            Launch App on{' '}
            <span className='app type'>
              {selectedNetwork.value}
            </span>
          </Button>
        </div>
      </div>
    </div>
  )
}

export { MarketplacePopup }
