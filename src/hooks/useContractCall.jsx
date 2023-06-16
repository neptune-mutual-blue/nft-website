import {
  useEffect,
  useState
} from 'react'

import { AppConstants } from '@/constants/AppConstants'
import { getContract } from '@/helpers/getContract'
import { Interface } from '@ethersproject/abi'
import { useWeb3React } from '@web3-react/core'

import {
  calculateGasMargin,
  getErrorMessage
} from '../helpers/solidity-methods'

export const useContractCall = ({ abi, address }) => {
  const { library, account } = useWeb3React()
  const [contract, setContract] = useState(null)

  useEffect(() => {
    if (!abi || !address || !library?.getSigner || !account) {
      setContract(null)
      return
    }

    try {
      const _c = getContract(address, abi, library?.getSigner())
      setContract(_c)
    } catch (error) {
      console.log('Error in creating contract: ', error)
      setContract(null)
    }
  }, [abi, address, library, account])

  async function callMethod (methodName, args = [], skipGasEstimation = false, swallowError = false) {
    if (!contract || !methodName) return

    const iface = new Interface(abi)

    let methodArgs = [...args]
    let estimatedGas = null
    try {
      if (!skipGasEstimation) {
        estimatedGas = await contract.estimateGas[methodName](...args)
      }

      try {
        methodArgs = [...args, { gasLimit: skipGasEstimation ? AppConstants.DEFAULT_GAS_LIMIT : calculateGasMargin(estimatedGas) }]
        const res = await contract[methodName](...methodArgs)

        if (res?.wait) {
          await res.wait(1)
        }

        return Array.isArray(res) ? Array.from(res) : [res]
      } catch (error) {
        if (error?.cancelled === false) {
          return [error.replacement]
        }

        if (!swallowError) console.error(getErrorMessage(error, iface, `Error in calling ${methodName} function:`))
        return {
          error: getErrorMessage(error, iface, `Error in calling ${methodName} function:`
          )
        }
      }
    } catch (e) {
      if (!swallowError) console.error(getErrorMessage(e, iface, `Could not estimate gas for ${methodName}(${methodArgs}):`))
      return { error: getErrorMessage(e, iface, `Could not estimate gas for ${methodName}(${methodArgs}):`), errorType: 'gasEstimation' }
    }
  }

  return { callMethod, isReady: Boolean(contract) }
}
