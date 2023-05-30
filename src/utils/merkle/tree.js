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

const getMerkleTree = (merkleTree) => {
  if (merkleTree.length > 0) {
    // [account, level, family, persona]
    const leaves = merkleTree.map((row) => {
      if (!row.family || !row.persona) return null

      return (
        [
          row.account,
          row.level,
          row.family,
          row.persona
        ]
      )
    }).filter(Boolean)

    const tree = generateTree(leaves.map(parseLeaf))

    return tree
  }
}

const getMerkleRoot = (merkleTree) => {
  const tree = getMerkleTree(merkleTree)

  const root = tree?.getHexRoot()

  return root
}

const getMerkleProof = (merkleTree, leaf) => {
  const tree = getMerkleTree(merkleTree)

  console.log(leaf)

  // [account, level, family, persona]
  return tree.getHexProof(parseLeaf(leaf))
}

export { generateTree, getMerkleProof, getMerkleRoot, parseLeaf }
