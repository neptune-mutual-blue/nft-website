import { Fragment } from 'react'

import { AppConstants } from '@/constants/AppConstants'
import { Icon } from '@/elements/Icon'
import { normalizeUrl } from '@/utils/url'

const VideoSection = ({ section, videos }) => {
  const { title, more } = section

  return (
    <div className='nav video section container'>
      <h4 className='title'>{title}</h4>
      <div className='content'>
        {
          videos?.length && videos.map((video) =>
            <Fragment key={video.videoId}>
              <button
                className='video container play button'
                data-video-id={video.videoId}
              >
                <div className='thumbnail'>
                  <img
                    src={AppConstants.neptunemutualOrigin + '/cdn/' + video.thumbnail.filename}
                    alt={video.title}
                    loading='lazy'
                  />
                  <div className='overlay'>
                    <Icon variant='play' size='2xl' />
                  </div>
                </div>
                <div className='video content'>
                  <h3 className='video title'>{video.title}</h3>
                  <p
                    className='video supporting text'
                  >{video.htmlAsText.length > 80 ? `${video.htmlAsText.slice(0, 80)}...` : video.htmlAsText}
                  </p>
                </div>
              </button>
            </Fragment>
          )
        }
      </div>
      {
        more && (
          <a
            className='more'
            href={normalizeUrl(more.href)}
            rel='noreferrer'
            target='_blank'
          >
            {more.title} <Icon size='sm' variant='arrow-right' />
          </a>
        )
      }
    </div>
  )
}

export default VideoSection
