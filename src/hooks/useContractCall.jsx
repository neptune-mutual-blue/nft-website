import {
  useEffect,
  useState
} from 'react'

import { AppConstants } from '@/constants/AppConstants'
import { getContract } from '@/helpers/getContract'
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
  POLICY_PROOF_MINTER: '0xE1aBC8041C0966854F73fd9e1450414E5A6C1a87',
  MERKLE_PROOF_MINTER: '0xe659af2671793e00878f2ab7c52757609cecf14c'
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
        return { error: `Error in calling ${methodName} function: ${getErrorMessage(error)}` }
      }
    } catch (e) {
      console.log(`Could not estimate gas for ${methodName}(${methodArgs})`)
      return { error: `Could not estimate gas for ${methodName}(${methodArgs}): ${getErrorMessage(e)}`, errorType: 'gasEstimation' }
    }
  }

  return { callMethod, isReady: Boolean(contract) }
}
