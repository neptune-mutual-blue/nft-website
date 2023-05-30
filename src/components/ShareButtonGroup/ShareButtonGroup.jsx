import { IconButton } from '@/components/IconButton/IconButton'
import { Icon } from '@/elements/Icon'
import { copyToClipboard } from '@/utils/copy-to-clipboard'

const getTwitterShareLink = (link, content) => {
  return `https://twitter.com/intent/tweet?text=${encodeURIComponent(content)}&url=${encodeURIComponent(link)}`
}

const getTelegramShareLink = (link, content) => {
  return `https://t.me/share/url?text=${encodeURIComponent(content)}&url=${encodeURIComponent(link)}`
}

const getFacebookShareLink = (link) => {
  return `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(link)}`
}

const getEmailShareLink = (link, content) => {
  return `mailto:?subject=${encodeURIComponent(content)}&body=${encodeURIComponent(link)}`
}

const ShareButtonGroup = ({ link, content }) => {
  return (
    <div className='share btn group'>
      <div className='share options'>
        <a href={getTwitterShareLink(link, content)} target='_blank' className='share platform'>
          <div className='platform icon'>
            <Icon variant='twitter' />
          </div>
          <div>Twitter</div>
        </a>
        <a href={getFacebookShareLink(link)} target='_blank' className='share platform'>
          <div className='platform icon'>
            <Icon variant='facebook' />
          </div>
          <div>Facebook</div>
        </a>
        <a href={getTelegramShareLink(link, content)} target='_blank' className='share platform'>
          <div className='platform icon'>
            <Icon variant='telegram' />
          </div>
          <div>Telegram</div>
        </a>
        <a href={getEmailShareLink(link, content)} className='share platform'>
          <div className='platform icon'>
            <Icon variant='email' />
          </div>
          <div>E-mail</div>
        </a>
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
