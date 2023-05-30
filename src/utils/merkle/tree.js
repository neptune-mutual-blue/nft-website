import { MerkleTree } from 'merkletreejs'

import { keccak256 } from '@ethersproject/keccak256'
import { pack } from '@ethersproject/solidity'
import { formatBytes32String } from '@ethersproject/strings'

const parseLeaf = (candidates) => {
  const [account, level, family, persona] = candidates

  return keccak256(pack(['address', 'uint8', 'bytes32', 'uint8'], [account, level, formatBytes32String(family), persona]))
}

const generateTree = (leaves) => {
  return new MerkleTree(leaves, keccak256, { sortPairs: true })
}

export { generateTree, parseLeaf }
