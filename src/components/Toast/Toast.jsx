import {
  createContext,
  useState
} from 'react'

import { Icon } from '@/elements/Icon'
import * as Toast from '@radix-ui/react-toast'

export const ToastContext = createContext({ showToast: ({ _title, _description, _type, _duration = 15000 }) => {}, setOpen: (_value) => {} })

export const ToastProvider = ({ children }) => {
  const [open, setOpen] = useState(false)
  const [toastDetails, setToastDetails] = useState()

  const showToast = ({ title, description, type, duration = 15000 }) => {
    setToastDetails({ title, description, type, duration })

    window.setTimeout(() => {
      setOpen(true)
    }, 100)
  }

  return (
    <ToastContext.Provider value={{ showToast, setOpen }}>
      {children}
      <Toast.Provider swipeDirection='right' duration={toastDetails?.duration ?? 15000}>
        <Toast.Root className='ToastRoot' open={open} onOpenChange={setOpen}>
          <Toast.Title className='ToastTitle'>{toastDetails?.title ?? ''}</Toast.Title>
          <Toast.Close asChild>
            <button className='IconButton' aria-label='Close'>
              <Icon variant='x-close' size='xl' />
            </button>
          </Toast.Close>
          <Toast.Description asChild>
            <time className='ToastDescription'>
              {toastDetails?.description ?? ''}
            </time>
          </Toast.Description>
        </Toast.Root>
        <Toast.Viewport className='ToastViewport' />
      </Toast.Provider>
    </ToastContext.Provider>

  )
}
