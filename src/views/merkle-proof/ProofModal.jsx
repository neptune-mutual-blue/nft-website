import React, {
  useEffect,
  useState
} from 'react'

import { Button } from '@/components/Button/Button'
import Listbox from '@/components/Listbox/Listbox'
import { Modal } from '@/components/Modal/Modal'
import { Tags } from '@/components/Tags/Tags'
import {
  ContractAbis,
  ContractAddresses
} from '@/config/contracts'
import { Icon } from '@/elements/Icon'
import { useContractCall } from '@/hooks/useContractCall'
import { getMerkleProof } from '@/utils/merkle/tree'
import { formatBytes32String } from '@ethersproject/strings'

const optionRender = (option) => {
  return (
    <div style={{ display: 'flex', gap: '8px' }}>
      <Tags
        tags={[
          {
            id: '1',
            slug: '1',
            text: `Level ${option.level}`,
            color: 'level' + option.level
          }
        ]}
      />
      <div>
        {option.value}
      </div>
    </div>
  )
}

const OPTIONS = [
  {
    value: 'Delphinus',
    level: 1,
    persona: 1,
    render: function () { return optionRender(this) }
  },
  {
    value: 'Sabersquatch',
    level: 1,
    persona: 2,
    render: function () { return optionRender(this) }
  },
  {
    value: 'Epic Delphinus',
    level: 2,
    persona: 1,
    render: function () { return optionRender(this) }
  },
  {
    value: 'Diabolic Sabersquatch',
    level: 2,
    persona: 2,
    render: function () { return optionRender(this) }
  },
  {
    value: 'Aquavallo',
    level: 3,
    persona: 1,
    render: function () { return optionRender(this) }
  },
  {
    value: 'Gargantuworm',
    level: 3,
    persona: 2,
    render: function () { return optionRender(this) }
  },
  {
    value: 'Epic Aquavallo',
    level: 4,
    persona: 1,
    render: function () { return optionRender(this) }
  },
  {
    value: 'Diabolic Gargantuworm',
    level: 4,
    persona: 2,
    render: function () { return optionRender(this) }
  },
  {
    value: 'Salacia',
    level: 5,
    persona: 1,
    render: function () { return optionRender(this) }
  },
  {
    value: 'Merman Serpent',
    level: 5,
    persona: 2,
    render: function () { return optionRender(this) }
  },
  {
    value: 'Epic Salacia',
    level: 6,
    persona: 1,
    render: function () { return optionRender(this) }
  },
  {
    value: 'Diabolic Merman Serpent',
    level: 6,
    persona: 2,
    render: function () { return optionRender(this) }
  },
  {
    value: 'Neptune',
    level: 7,
    persona: 0,
    render: function () { return optionRender(this) }
  },
  {
    value: 'Legendary Neptune',
    level: 7,
    persona: 0,
    render: function () { return optionRender(this) }
  }
]

const ProofModal = ({ open, setOpen, merkleRoot, merkleRootLive, merkleTree, merkleLeaf }) => {
  const [family, setFamily] = useState('')
  const [validity, setValidity] = useState()
  const [validating, setValidating] = useState(false)

  const [proof, setProof] = useState([])

  const { isReady, callMethod } = useContractCall({ abi: ContractAbis.MERKLE_PROOF_MINTER, address: ContractAddresses.MERKLE_PROOF_MINTER })

  const computeProof = () => {
    const selectedOption = OPTIONS.find((opt) => family === opt.value)
    if (selectedOption) {
      const proof = getMerkleProof(merkleTree, [merkleLeaf.account, selectedOption.level, selectedOption.value, selectedOption.persona])

      setProof(proof)
    } else {
      setProof([])
    }
  }

  const validateProof = async () => {
    if (!isReady) return

    const selectedOption = OPTIONS.find((opt) => family === opt.value)

    if (!selectedOption || !proof) {
      return setValidity(false)
    }

    setValidity(undefined)
    setValidating(true)

    try {
      const response = await callMethod('validateProof', [proof, selectedOption.level, formatBytes32String(selectedOption.value), selectedOption.persona])

      if (response && !response.error) {
        setValidity(true)
      } else {
        setValidity(false)
      }
    } catch (err) {
      console.error(err)
      setValidity(false)
    }

    setValidating(false)
  }

  useEffect(() => {
    setValidity(undefined)
  }, [open])

  useEffect(() => {
    if (merkleLeaf && merkleLeaf.family) {
      setFamily(merkleLeaf.family)
    } else {
      setFamily('')
      setProof([])
    }
  }, [merkleLeaf])

  useEffect(() => {
    if (merkleLeaf && merkleTree && family) {
      computeProof()
    }
    // eslint-disable-next-line
  }, [merkleLeaf, family])

  return (
    <Modal
      className='proof-modal'
      visible={open} setVisible={setOpen}
    >
      <div className='proof modal'>
        <h1>Merkle Proof</h1>

        <div className='root'>
          <span className='key'>Live Root: </span>
          {merkleRootLive}
        </div>
        <div className='root'>
          <span className='key'>Current Root: </span>
          {merkleRoot}

          <div className={`indicator${merkleRoot === merkleRootLive ? ' match' : ''}`}>
            <div className={`dot${merkleRoot === merkleRootLive ? ' match' : ''}`} />
            {merkleRootLive === merkleRoot ? 'Match' : 'Illegal Root'}
          </div>
        </div>

        <h2>Proof</h2>

        <div className='merkle-proof'>{JSON.stringify(proof, null, 2)}</div>
        <h2>Level/Family</h2>

        <Listbox options={OPTIONS} value={family} setValue={setFamily} />

        <div className='cta'>
          <Button size='xl' onClick={validateProof} disabled={validating}>Validate</Button>
        </div>

        {typeof validity !== 'undefined' && (
          <div className='validation'>
            <div className={`indicator${validity ? ' valid' : ''}`}>
              <div className='dot'>
                <Icon variant={validity ? 'check-circle' : 'alert-circle'} size='xs' />
              </div>
              {validity ? 'Proof is Valid' : 'Proof is Invalid'}
            </div>
          </div>
        )}

      </div>
    </Modal>
  )
}

export default ProofModal
