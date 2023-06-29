import merkleProofMinterABI from '../abis/IMerkleProofMinter.json'
import neptuneLegendsABI from '../abis/INeptuneLegends.json'
import policyProofMinterABI from '../abis/IPolicyProofMinter.json'

export const ContractAbis = {
  POLICY_PROOF_MINTER: policyProofMinterABI,
  MERKLE_PROOF_MINTER: merkleProofMinterABI,
  NEPTUNE_LEGENDS: neptuneLegendsABI
}

export const ContractAddresses = {
  POLICY_PROOF_MINTER: process.env.NEXT_PUBLIC_POLICY_PROOF_MINTER ?? '',
  MERKLE_PROOF_MINTER: process.env.NEXT_PUBLIC_MERKLE_PROOF_MINTER ?? '',
  NEPTUNE_LEGENDS: process.env.NEPTUNE_LEGENDS ?? ''
}
