import {
  useEffect,
  useState
} from 'react'

import { AppConstants } from '@/constants/AppConstants'
import { getContract } from '@/helpers/getContract'
import { Interface } from '@ethersproject/abi'
import { useWeb3React } from '@web3-react/core'

import merkleProofMinterABI from '../abis/IMerkleProofMinter.json'
import policyProofMinterABI from '../abis/IPolicyProofMinter.json'
import {
  calculateGasMargin,
  getErrorMessage
} from '../helpers/solidity-methods'

export const ContractAbis = {
  POLICY_PROOF_MINTER: policyProofMinterABI,
  MERKLE_PROOF_MINTER: merkleProofMinterABI
}

export const ContractAddresses = {
  POLICY_PROOF_MINTER: '0x71F46Cb7401206a5a603a5bcE5b43372e1204bD8',
  MERKLE_PROOF_MINTER: '0xd328822B75aEe344b240B7355Db5aF11e1541db6'
}

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

  async function callMethod (methodName, args = [], skipGasEstimation = false) {
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
        return Array.isArray(res) ? Array.from(res) : [res]
      } catch (error) {
        return {
          error: getErrorMessage(error, iface, `Error in calling ${methodName} function:`
          )
        }
      }
    } catch (e) {
      console.log(`Could not estimate gas for ${methodName}(${methodArgs})`)
      return { error: getErrorMessage(e, iface, `Could not estimate gas for ${methodName}(${methodArgs}):`), errorType: 'gasEstimation' }
    }
  }

  return { callMethod, isReady: Boolean(contract) }
}
