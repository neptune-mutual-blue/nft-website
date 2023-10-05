import React, {
  useEffect,
  useRef,
  useState
} from 'react'

import Link from 'next/link'

import { Button } from '@/components/Button/Button'
import { Checkbox } from '@/components/Checkbox/Checkbox'
import { Modal } from '@/components/Modal/Modal'
import { Icon } from '@/elements/Icon'
import { useLocalStorage } from '@/hooks/useLocalStorage'

const OnBoardingImagePage = ({ image, title, text, minimizedText, minimized }) => {
  return (
    <div className='onboarding image page'>
      <img src={image} alt='onboarding image' />

      <h1>{title}</h1>
      <div className='description'>{minimized ? minimizedText : text}</div>
    </div>
  )
}

const OnBoardingVideoPage = ({ video, title, text, minimizedText, minimized, play = false }) => {
  const videoRef = useRef()

  useEffect(() => {
    if (videoRef.current.pause) { videoRef.current.pause() }
  }, [])

  useEffect(() => {
    if (!videoRef.current.play || !videoRef.current.pause) { return }
    if (play) { videoRef.current.play() } else { videoRef.current.pause() }
  }, [play])

  return (
    <div className='onboarding image page' ref={videoRef}>
      <video autoPlay loop muted>
        <source src={video} type='video/mp4' />
        Your browser does not support HTML video.
      </video>

      <h1>{title}</h1>
      <div className='description'>{minimized ? minimizedText : text}</div>
    </div>
  )
}

const UserOnboarding = () => {
  const [checkboxNeverShow, setCheckboxNeverShow] = useState(false)
  const [neverShow, setNeverShow] = useLocalStorage('USER_ONBOARDING_NEVER_SHOW', false)
  const [expanded, setExpanded] = useState(false)
  const [page, setPage] = useState(1)

  const [open, setOpen] = useState(false)

  const closeDialog = () => {
    setOpen(false)
    setExpanded(false)

    document.body.style.overflow = 'auto'

    if (checkboxNeverShow || page === 4) {
      return setNeverShow(true)
    }
  }

  useEffect(() => {
    if (neverShow) {
      return closeDialog()
    }

    setOpen(true)
    setExpanded(true)
    // eslint-disable-next-line
  }, [])

  const minimized = !open && !expanded

  const wrap = (children) => {
    const hiddenModal = neverShow === undefined ? true : neverShow

    return (
      <>
        <div className={`minimized modal${hiddenModal ? ' hidden' : minimized ? '' : ' hidden'}`}>
          {children}
        </div>

        <Modal
          className='on-boarding-modal'
          visible={!minimized}
          setVisible={setOpen}
        >
          {children}
        </Modal>
      </>

    )
  }

  const previousButton = (
    <Button
      size='sm'
      variant='secondary-gray'
      disabled={page === 1}
      onClick={() => {
        setPage(page - 1)
      }}
    >
      <Icon variant='arrow-left' size='lg' />
    </Button>
  )

  const nextButton = (
    <Button
      size='sm'
      variant='primary'
      onClick={() => {
        if (page === 4) {
          return closeDialog()
        }

        setPage(page + 1)
      }}
      icon='only'
      iconTrailing='arrow-right'
    />

  )

  const checkbox = <Checkbox label='Do not show this again' checked={checkboxNeverShow} onChange={setCheckboxNeverShow} />

  return (
    <div className='user onboarding section'>
      {
        wrap(
          <div className='onboarding modal'>
            <button
              className={`expander${minimized ? '' : ' initially hidden'}`}
              onClick={() => {
                setExpanded(true)
                setOpen(true)
              }}
            >
              <Icon variant='maximize-01' size='xl' />
            </button>
            <div className='close onboarding'>
              {checkbox}

              <button onClick={() => {
                closeDialog()
              }}
              >
                <Icon variant='x-close' size='xl' />
              </button>
            </div>

            <div className='onboarding slider' style={{ left: `calc((${(page - 1) * 100}% + ${(page - 1) * (minimized ? 12 : 32)}px) * -1)` }}>
              <OnBoardingImagePage
                image='/assets/images/onboarding/welcome.png'
                title='Welcome to Neptune Mutual’s NFT Collection!'
                text='Explore the guidelines of our marketplace to mint your NFTs.'
                minimizedText=''
                minimized={minimized}
              />
              <OnBoardingVideoPage
                video='/assets/videos/onboarding-set-persona.mp4'
                title='Setup Your Persona'
                text={(
                  <>
                    Begin by clicking on '<Link href='/my-persona'>My Persona</Link>' to shape your NFT identity. Setting up your persona will help you fix the characters for your NFTs.
                  </>
                )}
                minimizedText={(
                  <>
                    Begin by clicking on '<Link href='/my-persona'>My Persona</Link>.'
                  </>
                )}
                minimized={minimized}
                play={page === 2}
              />
              <OnBoardingVideoPage
                video='/assets/videos/onboarding-mint.mp4'
                title='Mint Your NFT'
                text={(
                  <>
                    After setting your persona, you can start <Link href='/marketplace'>exploring the marketplace</Link> to mint your set of NFTs.
                  </>
                )}
                minimizedText={(
                  <>
                    Start <Link href='/marketplace'>exploring the marketplace.</Link>
                  </>
                )}
                minimized={minimized}
                play={page === 3}
              />
              <OnBoardingVideoPage
                video='/assets/videos/onboarding-marketplace.mp4'
                title='Enjoy and Discover Our Collection!'
                text={(
                  <>
                    By owning a Neptune Mutual NFT, you gain exclusive access to the benefits and features of the NFT ecosystem! <a href='https://neptunemutual.com/docs/neptune-mutual-nfts/' target='_blank'>Learn More.</a>
                  </>
                )}
                minimizedText={(
                  <>
                    <a href='https://neptunemutual.com/docs/neptune-mutual-nfts/' target='_blank'>Learn More.</a>
                  </>
                )}
                minimized={minimized}
                play={page === 1}
              />
            </div>

            <div className='pagination wrapper'>
              <div className='checkbox'>
                {checkbox}
              </div>
              <div>
                {page} of 4
              </div>
              <div className='pagination'>
                {previousButton}
                {nextButton}
              </div>
            </div>

            <div className='pagination wrapper mobile'>
              {previousButton}
              <div>
                {page} of 4
              </div>
              {nextButton}
            </div>

          </div>
        )
      }
    </div>
  )
}

export default UserOnboarding
