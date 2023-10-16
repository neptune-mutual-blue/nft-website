import {
  useCallback,
  useContext,
  useEffect,
  useState
} from 'react'

import { ToastContext } from '@/components/Toast/Toast'
import { bridgeConfig } from '@/config/bridge'
import {
  ContractAbis,
  ContractAddresses
} from '@/config/contracts'
import { AppConstants } from '@/constants/AppConstants'
import { useContractCall } from '@/hooks/useContractCall'
import { chains } from '@/lib/connect-wallet/utils/switch-network'
import { formatNpmToken } from '@/utils/currencyHelpers'
import { useWeb3React } from '@web3-react/core'

const useNftBridge = (selectedTokens, destinationChainId, lzAddress) => {
  const [balance, setBalance] = useState('')
  const [fees, setFees] = useState('')
  const [feesNumeric, setFeesNumeric] = useState(0)

  const { account, library, chainId } = useWeb3React()

  const nativeCurrency = chains[chainId]?.nativeCurrency.name ?? ''

  const { callMethod: callLz, isReady: isLzReady } = useContractCall({ abi: ContractAbis.LZ_NFT, address: bridgeConfig[AppConstants.NETWORK].lzProxyONft })
  const { callMethod: callNft, isReady: isNftReady } = useContractCall({ abi: ContractAbis.NEPTUNE_LEGENDS, address: ContractAddresses.NEPTUNE_LEGENDS })

  const [error, setError] = useState('')
  const { showToast, setOpen: setToastOpen } = useContext(ToastContext)

  const [isApproved, setApproved] = useState(false)
  const [sending, setSending] = useState(false)
  const [approving, setApproving] = useState(false)
  const [fetchingFees, setFetchingFees] = useState(false)

  const [transaction, setTransaction] = useState()

  const fetchApproved = useCallback(async () => {
    try {
      const [approved] = await callNft('isApprovedForAll', [account, lzAddress])
      setApproved(approved)
    } catch (err) {
      console.error(err)
    }
  }, [account, callNft, lzAddress])

  const approveForAll = async () => {
    setApproving(true)

    try {
      const response = await callNft('setApprovalForAll', [lzAddress, true])

      if (response && response.errorType === 'gasEstimation') {
        setError(response?.error ?? 'Unknown Error')
      } else if (!response || response.error) {
        showToast({
          title: 'Unable To Approve NFTs',
          description: response?.error ?? 'Unknown Error'
        })
      } else if (response) {
        fetchApproved()
      }
    } catch (err) {
      console.error(err)
    }

    setToastOpen(false)
    setApproving(false)
  }

  const sendNfts = async (unsafe = false) => {
    setError('')
    setSending(true)

    try {
      const destChainId = bridgeConfig[destinationChainId].lzChainId
      const response = await callLz('sendBatchFrom', [account, destChainId, account, selectedTokens, account, AppConstants.ADDRESS_ZERO, AppConstants.LZ_DEFAULT_ADAPTER_PARAMS], unsafe, false, { value: feesNumeric }, false, false, { value: feesNumeric })

      if (response && response.errorType === 'gasEstimation') {
        setError(response?.error ?? 'Unknown Error')
      } else if (!response || response.error) {
        showToast({
          title: 'Unable To Send NFTs',
          description: response?.error ?? 'Unknown Error'
        })
      }

      setTransaction(response[0])
    } catch (err) {
      console.error(err)
    }

    setToastOpen(false)
    setSending(false)
  }

  const getBalance = useCallback(async () => {
    try {
      const balance = await library.getBalance(account)

      setBalance(formatNpmToken(balance.toString(), 18, nativeCurrency))
    } catch (err) {
      console.error(err)
    }
  }, [account, library, nativeCurrency])

  const estimateFees = useCallback(async () => {
    setFetchingFees(true)

    try {
      const destChainId = bridgeConfig[destinationChainId].lzChainId

      const [fees] = await callLz('estimateSendBatchFee', [destChainId, account, selectedTokens, false, AppConstants.LZ_DEFAULT_ADAPTER_PARAMS])

      setFees(formatNpmToken(fees.toString(), 18, nativeCurrency))
      setFeesNumeric(fees.toString())
    } catch (err) {
      console.error(err)
    }

    setFetchingFees(false)
  }, [account, callLz, destinationChainId, nativeCurrency, selectedTokens])

  useEffect(() => {
    if (isNftReady && lzAddress && account) {
      fetchApproved()
    }
  }, [account, fetchApproved, isNftReady, lzAddress])

  useEffect(() => {
    if (selectedTokens.length > 0 && account && isLzReady) {
      estimateFees()
    } else {
      setFees('')
    }
    // eslint-disable-next-line
  }, [selectedTokens, account])

  useEffect(() => {
    if (account) {
      getBalance()
    }

    setBalance('')
  }, [account, getBalance])

  return {
    balance,
    fees,
    isApproved,
    fetchApproved,
    approveForAll,
    approving,
    sendNfts,
    sending,
    error,
    setError,
    fetchingFees,
    transaction,
    setTransaction
  }
}

export default useNftBridge
