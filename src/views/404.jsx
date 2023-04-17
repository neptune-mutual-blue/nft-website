import { Button } from '@/components/Button/Button'

const Error404 = () => {
  return (
    <div className='pagenotfound page'>
      <div className='inner container'>
        <h2>404 Error</h2>
        <h1>Page Not Found</h1>
        <p>Sorry, the page you are looking for doesn’t exist or has been moved.</p>
      </div>
      <Button
        type='anchor'
        variant='primary'
        size='xl'
        href='/'
        iconTrailing='arrow-narrow-right'
      >
        Take me to homepage
      </Button>
    </div>
  )
}

export default Error404
