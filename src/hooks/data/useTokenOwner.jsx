import {
  useCallback,
  useEffect,
  useState
} from 'react'

import {
  ContractAbis,
  ContractAddresses
} from '@/config/contracts'
import { useContractCall } from '@/hooks/useContractCall'

const useTokenOwner = (tokenId) => {
  const [owner, setOwner] = useState('')
  const [loading, setLoading] = useState(false)

  const { callMethod, isReady } = useContractCall({ abi: ContractAbis.NEPTUNE_LEGENDS, address: ContractAddresses.NEPTUNE_LEGENDS })

  const getOwner = useCallback(async () => {
    setLoading(true)

    try {
      const response = await callMethod('ownerOf', [parseInt(tokenId)], false, true)

      if (response && !response.error && response.length > 0) {
        setOwner(response[0])
      }
    } catch (err) {
      console.error('TOKEN OWNER', err)
    }

    setLoading(false)
  }, [callMethod, tokenId])

  useEffect(() => {
    if (isReady) {
      getOwner()
    }

  // eslint-disable-next-line
  }, [isReady])

  return {
    owner,
    loading,
    setOwner
  }
}

export default useTokenOwner
