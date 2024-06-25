import {
  useContext,
  useRef,
  useState
} from 'react'

import { ToastContext } from '@/components/Toast/Toast'
import { CustomTooltip } from '@/components/Tooltip/Tooltip'
import {
  ContractAbis,
  ContractAddresses
} from '@/config/contracts'
import { Icon } from '@/elements/Icon'
import { useERC20Balance } from '@/hooks/data/useERC20Balance'
import useMintedLevelStatus from '@/hooks/data/useHasMintedLevel'
import useMerkleLeaf from '@/hooks/data/useMerkleLeaf'
import useTokenOwner from '@/hooks/data/useTokenOwner'
import useUserInfo from '@/hooks/data/useUserInfo'
import { useContractCall } from '@/hooks/useContractCall'
import { AvailableEvents } from '@/hooks/useEvent'
import { emitter } from '@/lib/mitt'
import { NftApi } from '@/service/nft-api'
import { getMerkleProof } from '@/utils/merkle/tree'
import { formatNumber } from '@/utils/number-format'
import { formatBytes32String } from '@ethersproject/strings'
import { useWeb3React } from '@web3-react/core'

const useMint = ({ nftDetails, activePolicies, points, requiredPoints }) => {
  const nftPersona = nftDetails.role === 'Beast' ? 2 : 1

  const { account } = useWeb3React()

  const [showMintSuccessful, setShowMintSuccessful] = useState(false)
  const [error, setError] = useState('')

  const { balance } = useERC20Balance(ContractAddresses.NPM)

  const { callMethod: callPolicyProof, isReady: policyProofReady } = useContractCall({ abi: ContractAbis.POLICY_PROOF_MINTER, address: ContractAddresses.POLICY_PROOF_MINTER })
  const { callMethod: callMerkleProof, isReady: merkleProofReady } = useContractCall({ abi: ContractAbis.MERKLE_PROOF_MINTER, address: ContractAddresses.MERKLE_PROOF_MINTER })

  const { owner, loading: ownerLoading, setOwner } = useTokenOwner(nftDetails.tokenId)

  const { boundToken, fetchUserInfo, personaSet, persona } = useUserInfo(account)

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
    if (policyProofReady && (nftDetails.stage === 'Soulbound' || !nftDetails.stage)) {
      const response = await callPolicyProof('mint', [activePolicies[0].cxToken, nftDetails.tokenId], unsafe)

      if (response && response.errorType === 'gasEstimation') {
        setError(response?.error ?? 'Unknown Error')
      } else if (!response || response.error) {
        showToast({
          title: 'Unable To Mint NFT',
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
          title: 'Unable To Mint NFT',
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

  const getEligibilityChecklist = (openMarketplace) => {
    if (!nftDetails.level) {
      const eligibilityCheckList = [
        {
          label: (
            <div>
              Have an <button onClick={() => { return openMarketplace() }}>active policy</button> on <a href='https://bsc.neptunemutual.net/' target='_blank' rel='noopener noreferrer'>BSC</a>
            </div>
          ),
          completed: activePolicies.length > 0
        },
        // {
        //   label: 'Holding 10 NPM in your wallet',
        //   completed: (balance / 10 ** 18) > 10
        // },
        {
          label: 'Have not minted a Soulbound NFT',
          completed: !boundToken,
          errored: !!boundToken
        }
      ]

      return eligibilityCheckList
    }

    const eligibilityCheckList = [
      {
        label: (
          <div className='link'>
            Minted a Soulbound NFT
            <a href='/marketplace?soulbound=true' target='_blank'>
              <Icon variant='link-external-02' />
            </a>
          </div>
        ),
        completed: !!boundToken
      },
      nftDetails.level === 7
        ? undefined
        : {
            label: (
              <div className='link'>
                Set the Persona as {nftDetails.role}
                {!personaSet && (
                  <a href='/my-persona' target='_blank'>
                    <Icon variant='link-external-02' />
                  </a>
                )}
              </div>
            ),
            errored: personaSet && persona[nftDetails.level] !== nftPersona,
            completed: personaSet && persona[nftDetails.level] === nftPersona
          },
      {
        label: (
          <div>
            Collected {formatNumber(requiredPoints)} points by <button onClick={() => { return openMarketplace() }}>providing liquidity</button> or <button onClick={() => { return openMarketplace() }}>purchasing policy</button>.
          </div>
        ),
        completed: points > requiredPoints
      },

      {
        label: `Have not minted a level ${nftDetails.level} NFT`,
        completed: !mintedThisLevel,
        errored: mintedThisLevel
      },
      nftDetails.level === 1
        ? undefined
        : {
            label: (
              <div className='link'>
                Have minted <a href='tel:+' /> a level {nftDetails.level - 1} NFT
                <a href={`/marketplace?${personaSet ? `roles=${persona[nftDetails.level - 1] === 1 ? 'Guardian' : 'Beast'}&` : ''}level=${nftDetails.level - 1}`} target='_blank'>
                  <Icon variant='link-external-02' />
                </a>
              </div>
            ),
            completed: nftDetails.level === 1 || mintedPreviousLevel
          },

      {
        label: (
          <div className='checklist tooltip'>
            Merkle Proof Validation

            <CustomTooltip text='Merkle Proof will be updated and validated by the admin.'>
              <div>
                <Icon variant='info-circle' size='sm' />
              </div>
            </CustomTooltip>
          </div>
        ),
        completed: merkleLeaf && merkleLeaf.persona && merkleLeaf.family
      },

      {
        label: `Holding ${(10 * nftDetails.level)} NPM in your wallet`,
        completed: (balance / 10 ** 18) > (10 * nftDetails.level)
      }
    ]

    return eligibilityCheckList.filter(Boolean)
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

    if (points < requiredPoints) {
      return 'You need to get required points to unlock this NFT.'
    }

    // Other NFTs than SoulBould NFTs

    if (nftDetails.level) {
      if (!boundToken) {
        return 'You need to mint a soulbound NFT to start minting other NFTs.'
      }

      if (!personaSet) {
        return 'You need to set your persona before minting this NFT.'
      }

      if (mintedThisLevel) {
        return `You have already minted NFT of level ${nftDetails.level}.`
      }

      if (nftDetails.level !== 1 && !mintedPreviousLevel) {
        return `You need to first mint NFT of level ${nftDetails.level - 1} before minting this NFT.`
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

      // Level * 10 NPM required to mint NFT
      if ((balance / 10 ** 18) < (10 * nftDetails.level)) {
        return `Your need at least ${(10 * nftDetails.level)} NPM in your wallet to mint this NFT.`
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
    minting,
    getEligibilityChecklist
  }
}

export default useMint
