import {
  useEffect,
  useState
} from 'react'

import { v4 as uuidv4 } from 'uuid'

import { Breadcrumb } from '@/components/Breadcrumb/Breadcrumb'
import { Button } from '@/components/Button/Button'
import { ConnectWallet } from '@/components/ConnectWallet/ConnectWallet'
import Switch from '@/components/Switch/Switch'
import {
  ContractAbis,
  ContractAddresses,
  useContractCall
} from '@/hooks/useContractCall'
import { NftApi } from '@/service/nft-api'
import { NpmApi } from '@/service/npm-api'
import { formatDollar } from '@/utils/currencyHelpers'
import {
  generateTree,
  parseLeaf
} from '@/utils/merkle/tree'
import { RowPlaceholder } from '@/views/merkle-proof/RowPlaceholder'

const MerkleProofView = () => {
  const crumbs = [
    {
      link: '/',
      name: 'NFT Home'
    },
    {
      link: '/marketplace/',
      name: 'NFT Marketplace'
    },
    {
      link: '/marketplace/' + 123 + '/',
      name: 'Dummy NFT'
    },
    {
      link: '#',
      name: 'Minting Levels'
    },
    {
      link: '#',
      name: 'Merkle Proof'
    }
  ]

  const [showLiveData, setShowLiveData] = useState(false)
  const [loading, setLoading] = useState(false)

  const [merkleTree, setMerkleTree] = useState([])

  const [merkleRoot, setMerkleRoot] = useState('')

  useEffect(() => {
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

      const root = tree.getHexRoot()

      setMerkleRoot(root)
    }
  }, [merkleTree])

  const getMerkleTree = async () => {
    setLoading(true)

    try {
      const response = await NftApi.getMerkleTree(showLiveData)

      setMerkleTree(response.data)
    } catch (err) {
      console.error(err)
    }

    setLoading(false)
  }

  useEffect(() => {
    getMerkleTree()
    // eslint-disable-next-line
  }, [showLiveData])

  const { isReady, callMethod } = useContractCall({ abi: ContractAbis.MERKLE_PROOF_MINTER, address: ContractAddresses.MERKLE_PROOF_MINTER })

  const [busy, setBusy] = useState(false)

  const updateMerkleRoot = async () => {
    if (!isReady) return

    setBusy(true)
    try {
      const tx = await callMethod('setMerkleRoot', [merkleRoot])
      console.log(tx)

      const uuid = uuidv4()

      const response = await NpmApi.uploadMerkleDataIpfs(merkleTree.map(row => ({ ...row, id: uuid })))

      console.log(response)
    } catch (err) {
      console.error(err)
    }
    setBusy(false)
  }

  return (
    <section className='merkle proof view'>
      <div className='breadcrumb and connect wallet'>
        <Breadcrumb items={crumbs} />
        <ConnectWallet />
      </div>
      <div className='table'>
        <div className='header'>
          <div className='title and indicator'>
            <h1>Merkle Proof</h1>
            <div className='indicator'>
              <div className='dot' />
              {showLiveData ? 'Live' : 'Stale'}
            </div>
          </div>

          <Switch
            label='Show Live Data' value={showLiveData} onChange={(value) => {
              setShowLiveData(value)
            }}
          />
        </div>
        <div className='last updated'>
          Last Updated On: A Few Days Ago
        </div>

        {loading && Array.from({ length: 10 }).map((_, index) => (
          <RowPlaceholder key={index} />
        ))}

        {!loading && (
          <div className='content'>
            <div>
              <div className='row heading'>
                <div>Account</div>
                <div>Policy</div>
                <div>Liquidity</div>
                <div>Points</div>
                <div>Proof</div>
              </div>

              {merkleTree.map((row, index) => {
                return (
                  <div className='row' key={index}>
                    <div className='address'>{row.account}</div>
                    <div>{formatDollar(row.policy)}</div>
                    <div>{formatDollar(row.liquidity)}</div>
                    <div className='points'>{parseFloat(row.points).toLocaleString('en-US')}</div>
                    <div className='view-proof'>
                      <button>View Proof</button>
                    </div>
                  </div>
                )
              }
              )}

            </div>
          </div>
        )}

      </div>

      <div className='proof'>
        <div className='root'>
          <div className='label'>Merkle Proof:</div>
          <div className='value'>{merkleRoot}</div>
        </div>
        <Button size='xl' onClick={updateMerkleRoot}>Set Merkle Root</Button>
      </div>
    </section>
  )
}

export default MerkleProofView
