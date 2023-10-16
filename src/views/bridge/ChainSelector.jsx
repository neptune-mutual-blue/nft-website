import React, { useState } from 'react'

import { bridgeConfig } from '@/config/bridge'
import { Icon } from '@/elements/Icon'

const ChainSelector = ({ selectedChain, setSelectedChain }) => {
  const chains = Object.entries(bridgeConfig)

  const [open, setOpen] = useState(false)

  return (
    <div className='chain selector'>
      <div>
        <button
          className='trigger' onClick={() => {
            setOpen(!open)
          }}
        >
          <div className='chain info'>
            <img src={bridgeConfig[selectedChain].image} alt={bridgeConfig[selectedChain].chainName} />
            {bridgeConfig[selectedChain].chainShortName}
          </div>
          <Icon variant='chevron-down' size='md' />
        </button>
      </div>
      <div className={`dropdown items${open ? ' open' : ''}`}>
        {
          chains.map(([chain, config]) => {
            return (
              <button
                onClick={() => {
                  setSelectedChain(chain)
                  setOpen(false)
                }} className='chain item' key={chain}
              >
                <img src={config.image} alt={config.chainName} />
                {config.chainShortName}
              </button>
            )
          })
        }
      </div>
    </div>
  )
}

export default ChainSelector
