import { Icon } from '@/elements/Icon'

const VideoModal = () => {
  return (
    <div className='video modal container' data-open='false'>
      <div className='panel'>
        <p className='title'>
          Youtube Video
        </p>
        <p className='description'>
          Playing the video that you've selected below in an iframe
        </p>

        <iframe
          frameBorder='0'
          allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
          allowFullscreen
          title='Embedded youtube'
          className='video modal iframe'
        />
      </div>

      <button className='video modal close'>
        <span>Close video modal</span>
        <Icon variant='x' size='lg' />
      </button>
    </div>
  )
}

export default VideoModal
