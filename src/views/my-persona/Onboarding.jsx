import { useState } from 'react'

import { Icon } from '@/elements/Icon'

const Onboarding = ({ onSkip }) => {
  const [page, setPage] = useState(1)

  return (
    <div className='onboarding slider' style={{ left: `-${(page - 1) * 100}%` }}>
      <div className='onboarding guardian page'>
        <div className='supporting text'>
          The Personas
        </div>
        <img src='/assets/images/persona/guardian-logo.webp' className='logo' alt='Guardian Logo' srcSet='' />

        <div className='details'>
          <h1>Guardian</h1>
          <p>The Guardians are the protectors of DeFi. They are ancient beings who have sworn to defend the DeFi world against any threat and breaches.</p>
          <button className='skip' onClick={onSkip}>Skip</button>
          <div className='pagination'>
            <button onClick={() => {
              setPage(2)
            }}
            >
              Next
              <Icon variant='arrow-right' size='lg' />
            </button>
          </div>
        </div>
      </div>
      <div className='onboarding beast page'>
        <div className='supporting text'>
          The Personas
        </div>
        <img src='/assets/images/persona/beast-logo.webp' className='logo' alt='Beast Logo' srcset='' />

        <div className='details'>
          <h1>Beast</h1>
          <p>The Guardians are the protectors of DeFi. They are ancient beings who have sworn to defend the DeFi world against any threat and breaches.</p>
          <div className='pagination'>
            <button onClick={() => {
              setPage(1)
            }}
            >
              <Icon variant='arrow-left' size='lg' />
              Previous
            </button>
            <button onClick={onSkip}>
              Next
              <Icon variant='arrow-right' size='lg' />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Onboarding
