import {
  useCallback,
  useEffect
} from 'react'

import { emitter } from '@/lib/mitt'

const AvailableEvents = {
  NEW_NFT_MINTED: 'new-nft-minted'
}

const useEvent = (eventName, handler) => {
  const handleEvent = useCallback((...values) => {
    handler(...values)
  }, [handler])

  useEffect(() => {
    emitter.on(eventName, handleEvent)
    return () => {
      emitter.off(eventName, handleEvent)
    }
  }, [eventName, handleEvent])
}

export { AvailableEvents, useEvent }
