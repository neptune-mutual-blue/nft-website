import { Contract } from '@ethersproject/contracts'

const getContract = (address, abi, signerOrProvider) => {
  return new Contract(address, abi, signerOrProvider)
}

export { getContract }
