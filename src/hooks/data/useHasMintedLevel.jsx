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

const useMintedLevelStatus = (address, level) => {
  const [status, setStatus] = useState(false)
  const [loading, setLoading] = useState(false)

  const { callMethod, isReady } = useContractCall({ abi: ContractAbis.MERKLE_PROOF_MINTER, address: ContractAddresses.MERKLE_PROOF_MINTER })

  const checkStatus = useCallback(async () => {
    if (level === -1) { return }

    setLoading(true)

    try {
      const response = await callMethod('_mintStatus', [address, level])

      if (response && !response.error && response.length > 0) {
        setStatus(response[0])
      }
    } catch (err) {
      console.error(err)
    }

    setLoading(false)
  }, [callMethod, address, level])

  useEffect(() => {
    if (isReady && address) {
      checkStatus()
    }

  // eslint-disable-next-line
  }, [isReady, address])

  return {
    status,
    loading
  }
}

export default useMintedLevelStatus
