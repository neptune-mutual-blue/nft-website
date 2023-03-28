import { IconButton } from '@/components/IconButton/IconButton'
import { Icon } from '@/elements/Icon'
import { copyToClipboard } from '@/utils/copy-to-clipboard'

const ShareButtonGroup = ({ link }) => {
  return (
    <div className='share btn group'>
      <div className='share options'>
        <button className='share platform'>
          <div className='platform icon'>
            <Icon variant='twitter' />
          </div>
          <div>Twitter</div>
        </button>
        <button className='share platform'>
          <div className='platform icon'>
            <Icon variant='facebook' />
          </div>
          <div>Facebook</div>
        </button>
        <button className='share platform'>
          <div className='platform icon'>
            <Icon variant='telegram' />
          </div>
          <div>Telegram</div>
        </button>
        <button className='share platform'>
          <div className='platform icon'>
            <Icon variant='email' />
          </div>
          <div>E-mail</div>
        </button>
      </div>

      <div className='share link'>
        <div className='link text'>
          {link}
        </div>

        <IconButton
          noWrapper
          showFeedback
          size='lg' variant='copy-01' onClick={() => {
            copyToClipboard(link)
          }}
        />

      </div>
    </div>
  )
}

export { ShareButtonGroup }
