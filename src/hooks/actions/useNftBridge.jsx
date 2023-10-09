import {
  useEffect,
  useState
} from 'react'

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

  const [isApproved, setApproved] = useState(false)
  const [sending, setSending] = useState(false)
  const [approving, setApproving] = useState(false)

  const fetchApproved = async () => {
    try {
      const [approved] = await callNft('isApprovedForAll', [account, lzAddress])
      setApproved(approved)
    } catch (err) {
      console.error(err)
    }
  }

  const approveForAll = async () => {
    setApproving(true)

    try {
      await callNft('setApprovalForAll', [lzAddress, true])
      fetchApproved()
    } catch (err) {
      console.error(err)
    }

    setApproving(false)
  }

  const sendNfts = async () => {
    setSending(true)

    try {
      const destChainId = bridgeConfig[destinationChainId].lzChainId
      await callLz('sendBatchFrom', [account, destChainId, account, selectedTokens, account, AppConstants.ADDRESS_ZERO, AppConstants.LZ_DEFAULT_ADAPTER_PARAMS], false, false, { value: feesNumeric }, false, false, { value: feesNumeric })
    } catch (err) {
      console.error(err)
    }

    setSending(false)
  }

  const getBalance = async () => {
    try {
      const balance = await library.getBalance(account)

      setBalance(formatNpmToken(balance.toString(), 18, nativeCurrency))
    } catch (err) {
      console.error(err)
    }
  }

  const estimateFees = async () => {
    try {
      const destChainId = bridgeConfig[destinationChainId].lzChainId

      const [fees] = await callLz('estimateSendBatchFee', [destChainId, account, selectedTokens, false, AppConstants.LZ_DEFAULT_ADAPTER_PARAMS])

      setFees(formatNpmToken(fees.toString(), 18, nativeCurrency))
      setFeesNumeric(fees.toString())
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    if (isNftReady && lzAddress && account) {
      fetchApproved()
    }

    if (selectedTokens.length > 0 && account && isLzReady) {
      estimateFees()
    } else {
      setFees('')
    }
  }, [account, isLzReady, selectedTokens])

  useEffect(() => {
    if (account) {
      getBalance()
    }

    setBalance('')
  }, [account])

  return {
    balance,
    fees,
    isApproved,
    fetchApproved,
    approveForAll,
    approving,
    sendNfts,
    sending
  }
}

export default useNftBridge
