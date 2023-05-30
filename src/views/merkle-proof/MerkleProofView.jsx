import {
  useContext,
  useEffect,
  useState
} from 'react'

import { v4 as uuidv4 } from 'uuid'

import { Breadcrumb } from '@/components/Breadcrumb/Breadcrumb'
import { Button } from '@/components/Button/Button'
import { ConnectWallet } from '@/components/ConnectWallet/ConnectWallet'
import Switch from '@/components/Switch/Switch'
import { ToastContext } from '@/components/Toast/Toast'
import {
  ContractAbis,
  ContractAddresses,
  useContractCall
} from '@/hooks/useContractCall'
import { NftApi } from '@/service/nft-api'
import { NpmApi } from '@/service/npm-api'
import { formatDollar } from '@/utils/currencyHelpers'
import { getMerkleRoot } from '@/utils/merkle/tree'
import { RowPlaceholder } from '@/views/merkle-proof/RowPlaceholder'
import { formatBytes32String } from '@ethersproject/strings'
import { useWeb3React } from '@web3-react/core'

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
      link: '/marketplace/minting-levels',
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
  const [merkleTreeLive, setMerkleTreeLive] = useState([])

  const [merkleRoot, setMerkleRoot] = useState('')
  const [merkleRootLive, setMerkleRootLive] = useState('')

  useEffect(() => {
    if (merkleTree) {
      setMerkleRoot(getMerkleRoot(merkleTree))
    }
  }, [merkleTree])

  useEffect(() => {
    if (merkleTreeLive) {
      setMerkleRootLive(getMerkleRoot(merkleTreeLive))
    }
  }, [merkleTreeLive])

  const getMerkleTrees = async () => {
    setLoading(true)

    try {
      const [response, liveResponse] = await Promise.all([NftApi.getMerkleTree(false), NftApi.getMerkleTree(true)])

      setMerkleTree(response.data)
      setMerkleTreeLive(liveResponse.data)
    } catch (err) {
      console.error(err)
    }

    setLoading(false)
  }

  const { account } = useWeb3React()

  useEffect(() => {
    getMerkleTrees()
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    if (account) {
      checkRole()
    }
    // eslint-disable-next-line
  }, [account])

  const { isReady, callMethod } = useContractCall({ abi: ContractAbis.MERKLE_PROOF_MINTER, address: ContractAddresses.MERKLE_PROOF_MINTER })

  const [busy, setBusy] = useState(false)

  const { showToast } = useContext(ToastContext)

  const [showUpdateRootButton, setShowUpdateRootButton] = useState(false)

  const checkRole = async () => {
    try {
      const response = await callMethod('hasRole', [formatBytes32String('proof:agent'), account])
      if (response && !response.error && response.length > 0 && response[0]) {
        setShowUpdateRootButton(true)
      }
    } catch (err) {
      console.error(err)
    }
  }

  const updateMerkleRoot = async () => {
    if (!isReady) return

    setBusy(true)
    try {
      let txHash = localStorage.getItem('MERKLE_ROOT_TX_HASH') || ''

      if (!txHash) {
        const tx = await callMethod('setMerkleRoot', [merkleRoot])

        if (tx.length > 0 && tx[0].hash) {
          txHash = tx[0].hash
          localStorage.setItem('MERKLE_ROOT_TX_HASH', txHash)
        }

        if (tx.error) {
          throw tx.error
        }
      }

      let ipfsHash = localStorage.getItem('MERKLE_ROOT_IPFS_HASH') || ''
      let uuid = localStorage.getItem('MERKLE_ROOT_UUID') || ''

      if (!ipfsHash || !uuid) {
        uuid = uuidv4()

        const response = await NpmApi.uploadMerkleDataIpfs(merkleTree.map(row => ({ ...row, id: uuid })))

        ipfsHash = response.data.hash

        localStorage.setItem('MERKLE_ROOT_UUID', uuid)
        localStorage.setItem('MERKLE_ROOT_IPFS_HASH', ipfsHash)
      }

      await NftApi.setMerkleProof({
        id: uuid,
        transaction: txHash.replace(/^0x/, ''),
        info: ipfsHash
      })

      localStorage.removeItem('MERKLE_ROOT_TX_HASH')
      localStorage.removeItem('MERKLE_ROOT_UUID')
      localStorage.removeItem('MERKLE_ROOT_IPFS_HASH')

      showToast({
        title: 'Success',
        description: 'Merkle Proof Set Successfully.'
      })
    } catch (err) {
      showToast({
        title: 'Error',
        description: 'Something went wrong while setting the merkle proof. Check browser console for details.'
      })
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

              {(showLiveData ? merkleTreeLive : merkleTree).map((row, index) => {
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
          <div className='label'>Stale Merkle Proof:</div>
          <div className='value'>{merkleRoot}</div>
        </div>
        <div className='root'>
          <div className='label'>Current Merkle Proof:</div>
          <div className='value'>{merkleRootLive}</div>
        </div>
        {showLiveData && showUpdateRootButton && merkleRoot !== merkleRootLive && (
          <Button size='xl' disabled={busy} onClick={updateMerkleRoot}>Set Merkle Root</Button>
        )}
      </div>
    </section>
  )
}

export default MerkleProofView
