import { useEffect } from 'react'

import { Icon } from '@/elements/Icon'
import * as Dialog from '@radix-ui/react-dialog'

const Modal = (props) => {
  const { cross, children, visible, setVisible, title, description, trigger, className, disableChildrenAsChild } = props

  useEffect(() => {
    if (visible) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
  }, [visible])
  return (
    <Dialog.Root open={visible} onOpenChange={setVisible} modal={false}>
      {disableChildrenAsChild && (
        <>
          {trigger}
        </>
      )}
      {!disableChildrenAsChild && (
        <Dialog.Trigger asChild={!disableChildrenAsChild}>
          {trigger}
        </Dialog.Trigger>
      )}
      <Dialog.Portal>
        <div className='DialogOverlay' />
        <Dialog.Content className={'DialogContent' + (className ? ' ' + className : '')}>
          {title && (
            <div className='titlebar'>
              <Dialog.Title className='DialogTitle'>
                <div className='title'>
                  {title}
                </div>
              </Dialog.Title>
              {cross && (
                <Dialog.Close asChild>
                  <button className='IconButton' aria-label='Close'>
                    <Icon variant='x-close' size='xl' />
                  </button>
                </Dialog.Close>
              )}
            </div>
          )}
          {description && (
            <Dialog.Description className='DialogDescription'>
              {description}
            </Dialog.Description>
          )}
          {children}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

export { Modal }
