import Section from '@/components/Header/Section'
import VideoSection from '@/components/Header/VideoSection'

const SubMenu = ({ data, videos }) => {
  return (
    <>
      {
        data
          .filter((nav) => nav.children)
          .map(
            ({ children }) => {
              return (
                children && (
                  <div className='sub menu container' data-open='false'>
                    <div className='left space' />

                    <div className='content'>
                      <div className='non video sections'>
                        {children
                          .filter((x) => x.type === 'section')
                          .map((child) => {
                            return <Section key={child.title} section={child} />
                          })}
                      </div>
                      <div className='video sections'>
                        {children
                          .filter((x) => x.type !== 'section')
                          .map((child) => {
                            return <VideoSection key={child.title} section={child} videos={videos} />
                          })}
                      </div>
                    </div>

                    <div className='right space' />
                  </div>
                )
              )
            }
          )
      }
    </>
  )
}

export default SubMenu
