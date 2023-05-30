import {
  useCallback,
  useEffect,
  useState
} from 'react'

import {
  ContractAbis,
  ContractAddresses,
  useContractCall
} from '@/hooks/useContractCall'

const useBoundToken = (address) => {
  const [boundToken, setBoundToken] = useState('')
  const [loading, setLoading] = useState(false)

  const { callMethod, isReady } = useContractCall({ abi: ContractAbis.NEPTUNE_LEGENDS, address: ContractAddresses.NEPTUNE_LEGENDS })

  const getBoundToken = useCallback(async () => {
    setLoading(true)

    try {
      const response = await callMethod('_boundTokenId', [address])

      if (response && !response.error && response.length > 0) {
        setBoundToken(parseInt(response[0].toString()))
      }
    } catch (err) {
      console.error(err)
    }

    setLoading(false)
  }, [callMethod, address])

  useEffect(() => {
    if (isReady && address) {
      getBoundToken()
    }

  // eslint-disable-next-line
  }, [isReady, address])

  return {
    boundToken,
    loading
  }
}

export default useBoundToken
