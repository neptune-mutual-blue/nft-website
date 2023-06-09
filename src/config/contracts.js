import merkleProofMinterABI from '../abis/IMerkleProofMinter.json'
import neptuneLegendsABI from '../abis/INeptuneLegends.json'
import policyProofMinterABI from '../abis/IPolicyProofMinter.json'

export const ContractAbis = {
  POLICY_PROOF_MINTER: policyProofMinterABI,
  MERKLE_PROOF_MINTER: merkleProofMinterABI,
  NEPTUNE_LEGENDS: neptuneLegendsABI
}

export const ContractAddresses = {
  POLICY_PROOF_MINTER: '0xbF7176F75B73DF752F52f429AF853A5f7edBb1FA',
  MERKLE_PROOF_MINTER: '0x0866f9927d94a5D7072E91DcF77E407099170Bf5',
  NEPTUNE_LEGENDS: '0xd673f97cA6DC3f807E0EAA9d0271b165C2A6d657'
}
