import {
  useCallback,
  useEffect,
  useState
} from 'react'

import { ContractAbis } from '@/config/contracts'
import { useContractCall } from '@/hooks/useContractCall'
import { useWeb3React } from '@web3-react/core'

export const useERC20Balance = (tokenAddress) => {
  const [balance, setBalance] = useState('0')
  const [loading, setLoading] = useState(false)
  const { account } = useWeb3React()

  const { callMethod, isReady } = useContractCall({ abi: ContractAbis.ERC20, address: tokenAddress })

  const fetchBalance = useCallback(
    async ({ onTransactionResult, onError }) => {
      if (!isReady || !account) {
        return
      }

      try {
        const response = await callMethod('balanceOf', [account])

        if (response && !response.error && response.length > 0) {
          onTransactionResult(response[0])
        }
      } catch (e) {
        onError()
        console.error(e)
      }
    },
    [account, callMethod, isReady]
  )

  useEffect(() => {
    let ignore = false
    setLoading(true)

    const cleanup = () => {
      setLoading(false)
    }

    const onTransactionResult = (result) => {
      const _balance = result
      if (ignore || !_balance) { return }
      setBalance(_balance.toString())
      cleanup()
    }

    const onError = () => {
      cleanup()
    }

    fetchBalance({ onTransactionResult, onError })

    return () => {
      ignore = true
    }
  }, [fetchBalance])

  // Resets loading and other states which are modified in the above hook
  // "IF" condition should match the above effect
  // Should appear after the effect which contains the async function (which sets loading state)
  useEffect(() => {
    if (!account) {
      if (balance !== '0') {
        setBalance('0')
      }
      if (loading !== false) {
        setLoading(false)
      }
    }
  }, [account, balance, loading])

  const refetch = useCallback(async () => {
    setLoading(true)

    const cleanup = () => {
      setLoading(false)
    }

    const onTransactionResult = (result) => {
      const _balance = result
      cleanup()
      if (_balance) {
        setBalance(_balance.toString())
      }
    }

    const onError = (err) => {
      cleanup()
      console.error(err)
    }

    fetchBalance({ onTransactionResult, onError })
  }, [fetchBalance])

  return { balance, loading, refetch }
}
