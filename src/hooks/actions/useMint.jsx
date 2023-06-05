import {
  useContext,
  useRef,
  useState
} from 'react'

import { ToastContext } from '@/components/Toast/Toast'
import useMintedLevelStatus from '@/hooks/data/useHasMintedLevel'
import useMerkleLeaf from '@/hooks/data/useMerkleLeaf'
import useTokenOwner from '@/hooks/data/useTokenOwner'
import useUserInfo from '@/hooks/data/useUserInfo'
import {
  ContractAbis,
  ContractAddresses,
  useContractCall
} from '@/hooks/useContractCall'
import { AvailableEvents } from '@/hooks/useEvent'
import { emitter } from '@/lib/mitt'
import { NftApi } from '@/service/nft-api'
import { getMerkleProof } from '@/utils/merkle/tree'
import { formatBytes32String } from '@ethersproject/strings'
import { useWeb3React } from '@web3-react/core'

const useMint = ({ nftDetails, activePolicies, points, requiredPoints }) => {
  const nftPersona = nftDetails.role === 'Beast' ? 2 : 1

  const { account } = useWeb3React()

  const [showMintSuccessful, setShowMintSuccessful] = useState(false)
  const [error, setError] = useState('')

  const { callMethod: callPolicyProof, isReady: policyProofReady } = useContractCall({ abi: ContractAbis.POLICY_PROOF_MINTER, address: ContractAddresses.POLICY_PROOF_MINTER })
  const { callMethod: callMerkleProof, isReady: merkleProofReady } = useContractCall({ abi: ContractAbis.MERKLE_PROOF_MINTER, address: ContractAddresses.MERKLE_PROOF_MINTER })

  const { owner, loading: ownerLoading, setOwner } = useTokenOwner(nftDetails.tokenId)

  const { boundToken, fetchUserInfo } = useUserInfo(account)

  const { status: mintedThisLevel } = useMintedLevelStatus(account, nftDetails.level ? nftDetails.level : -1)
  const { status: mintedPreviousLevel } = useMintedLevelStatus(account, nftDetails.level ? nftDetails.level - 1 : -1)

  const [minting, setMinting] = useState(false)
  const { showToast, setOpen: setToastOpen } = useContext(ToastContext)

  const { merkleLeaf } = useMerkleLeaf(account, nftDetails.level)

  const merkleTree = useRef()

  const mint = async (unsafe = false) => {
    setError('')
    setMinting(true)

    // Proof of Policy Minter
    if (policyProofReady && nftDetails.stage === 'Soulbound') {
      const response = await callPolicyProof('mint', [activePolicies[0].cxToken, nftDetails.tokenId], unsafe)

      if (response && response.errorType === 'gasEstimation') {
        setError(response?.error ?? 'Unknown Error')
      } else if (!response || response.error) {
        showToast({
          title: 'Error',
          description: response?.error ?? 'Unknown Error'
        })
      } else if (response) {
        setOwner(account)
        setShowMintSuccessful(true)
      }

      // Merkle Proof Minter
    } else if (merkleProofReady && nftDetails.level) {
      // Build Proof
      if (!merkleTree.current) {
        try {
          const response = await NftApi.getMerkleTree()

          merkleTree.current = response.data
        } catch (err) {
          console.error(err)
        }
      }

      // [account, level, family, persona]
      const proof = getMerkleProof(merkleTree.current, [account, nftDetails.level, nftDetails.category, nftPersona])

      // Call Contract
      const response = await callMerkleProof('mint', [proof, boundToken, nftDetails.level, formatBytes32String(nftDetails.category), nftPersona, parseInt(nftDetails.tokenId)], unsafe)

      if (response && response.errorType === 'gasEstimation') {
        setError(response?.error ?? 'Unknown Error')
      } else if (!response || response.error) {
        showToast({
          title: 'Error',
          description: response?.error ?? 'Unknown Error'
        })
      } else if (response) {
        fetchUserInfo()
        setOwner(account)
        setShowMintSuccessful(true)
        emitter.emit(AvailableEvents.NEW_NFT_MINTED, nftDetails)
      }
    }

    setToastOpen(false)
    setMinting(false)
  }

  const getButtonDisabledReason = () => {
    if (!account) {
      return 'Connect Your Wallet First!'
    }

    if (minting) {
      return 'Minting in progress.'
    }

    // SoulBould NFTs

    if (!nftDetails.level && activePolicies.length <= 0) {
      return 'You must have an active policy to mint a soulbound NFT.'
    }

    if (!nftDetails.level && boundToken) {
      return 'You already have minted a soulbound NFT.'
    }

    if (!nftDetails.level && activePolicies.length <= 0) {
      return 'You must have an active policy to mint a soulbound NFT.'
    }

    if (points < requiredPoints) {
      return 'You need to get required points to unlock this NFT.'
    }

    // Other NFTs than SoulBould NFTs

    if (nftDetails.level && nftDetails.level !== 7) {
      if (!boundToken) {
        return 'You need to mint a soulbound NFT to start minting other NFTs.'
      }

      if (mintedThisLevel) {
        return `You have already minted NFT of Level ${nftDetails.level}.`
      }

      if (nftDetails.level !== 1 && !mintedPreviousLevel) {
        return `You need to first mint NFT of Level ${nftDetails.level - 1} before minting this NFT.`
      }

      if (!merkleLeaf) {
        return 'You are not eligble to mint this NFT or the merkle root is not updated.'
      }

      if (!merkleLeaf.persona || !merkleLeaf.family) {
        return 'You need to set you persona first before minting this NFT. If you have already set your persona, it might take some time as the merkle root might not be updated yet.'
      }

      if (merkleLeaf.persona !== nftPersona) {
        return `You have selected ${merkleLeaf.persona === 1 ? 'Guardian' : 'Beast'} as your persona, so you cannot mint ${nftDetails.family}.`
      }
    }

    return ''
  }

  const disabledReason = getButtonDisabledReason()

  return {
    mint,
    disabledReason,
    showMintSuccessful,
    setShowMintSuccessful,
    owner,
    ownerLoading,
    error,
    setError,
    minting
  }
}

export default useMint
