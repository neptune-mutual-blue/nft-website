import {
  useEffect,
  useState
} from 'react'

import { bridgeConfig } from '@/config/bridge'
import { ContractAbis } from '@/config/contracts'
import { AppConstants } from '@/constants/AppConstants'
import { useContractCall } from '@/hooks/useContractCall'
import { chains } from '@/lib/connect-wallet/utils/switch-network'
import { formatNpmToken } from '@/utils/currencyHelpers'
import { useWeb3React } from '@web3-react/core'

const useNftBridge = (selectedTokens, destinationChainId) => {
  const [balance, setBalance] = useState('')
  const [fees, setFees] = useState('')

  const { account, library, chainId } = useWeb3React()

  const nativeCurrency = chains[chainId]?.nativeCurrency.name ?? ''

  const { callMethod: callLz, isReady: isLzReady } = useContractCall({ abi: ContractAbis.LZ_NFT, address: bridgeConfig[AppConstants.NETWORK].lzProxyONft })

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
      console.log(destinationChainId)
      const destChainId = bridgeConfig[destinationChainId].lzChainId

      const fees = await callLz('estimateSendBatchFee', [destChainId, account, selectedTokens, false, AppConstants.LZ_DEFAULT_ADAPTER_PARAMS])

      setFees(formatNpmToken(fees[0].toString(), 18, nativeCurrency))
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    console.log(account, isLzReady)
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
    fees
  }
}

export default useNftBridge
