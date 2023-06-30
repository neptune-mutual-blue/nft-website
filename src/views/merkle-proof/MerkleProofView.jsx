import {
  useContext,
  useEffect,
  useState
} from 'react'

import { v4 as uuidv4 } from 'uuid'

import { Breadcrumb } from '@/components/Breadcrumb/Breadcrumb'
import { Button } from '@/components/Button/Button'
import { ConnectWallet } from '@/components/ConnectWallet/ConnectWallet'
import { LoaderPopup } from '@/components/LoaderPopup/LoaderPopup'
import Switch from '@/components/Switch/Switch'
import { ToastContext } from '@/components/Toast/Toast'
import {
  ContractAbis,
  ContractAddresses
} from '@/config/contracts'
import { useContractCall } from '@/hooks/useContractCall'
import { NftApi } from '@/service/nft-api'
import { NpmApi } from '@/service/npm-api'
import { formatDollar } from '@/utils/currencyHelpers'
import { getMerkleRoot } from '@/utils/merkle/tree'
import { formatNumber } from '@/utils/number-format'
import ProofModal from '@/views/merkle-proof/ProofModal'
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

  const [selectedLeafIndex, setSelectedLeafIndex] = useState(-1)

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

  const { isReady, callMethod } = useContractCall({ abi: ContractAbis.MERKLE_PROOF_MINTER, address: ContractAddresses.MERKLE_PROOF_MINTER })

  useEffect(() => {
    getMerkleTrees()
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    if (isReady && account) {
      checkRole()
    }
    // eslint-disable-next-line
  }, [account, isReady])

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
    if (!isReady) { return }

    setBusy(true)
    try {
      const savedMerkleRoot = localStorage.getItem('MERKLE_ROOT') || ''

      if (savedMerkleRoot && savedMerkleRoot !== merkleRootLive) {
        localStorage.removeItem('MERKLE_ROOT')
        localStorage.removeItem('MERKLE_ROOT_TX_HASH')
        localStorage.removeItem('MERKLE_ROOT_UUID')
        localStorage.removeItem('MERKLE_ROOT_IPFS_HASH')
      }

      let txHash = localStorage.getItem('MERKLE_ROOT_TX_HASH') || ''

      if (!txHash) {
        const tx = await callMethod('setMerkleRoot', [merkleRootLive])

        if (tx.length > 0 && tx[0].hash) {
          txHash = tx[0].hash
          localStorage.setItem('MERKLE_ROOT', merkleRootLive)
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

        const response = await NpmApi.uploadMerkleDataIpfs(merkleTreeLive.map(row => { return { ...row, id: uuid } }))

        ipfsHash = response.data.hash

        localStorage.setItem('MERKLE_ROOT_UUID', uuid)
        localStorage.setItem('MERKLE_ROOT_IPFS_HASH', ipfsHash)
      }

      await new Promise((resolve) => {
        setTimeout(() => {
          resolve()
        }, 5000)
      })

      await NftApi.setMerkleProof({
        id: uuid,
        transaction: txHash.replace(/^0x/, ''),
        info: ipfsHash
      })

      localStorage.removeItem('MERKLE_ROOT')
      localStorage.removeItem('MERKLE_ROOT_TX_HASH')
      localStorage.removeItem('MERKLE_ROOT_UUID')
      localStorage.removeItem('MERKLE_ROOT_IPFS_HASH')

      showToast({
        title: 'Success',
        description: 'Merkle Proof Set Successfully.'
      })
    } catch (err) {
      showToast({
        title: 'Unable To Set Merkle Proof',
        description: 'Something went wrong while setting the merkle proof. Check browser console for details.'
      })
      console.error(err)
    }
    setBusy(false)
  }

  return (
    <section className='merkle proof view'>
      <LoaderPopup visible={busy} title='Setting New Merkle Root...' />

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
              {showLiveData ? 'Live' : 'Current'}
            </div>
          </div>

          <Switch
            label='Show Live Data' value={showLiveData} onChange={(value) => {
              setShowLiveData(value)
            }}
          />
        </div>
        <div className='last updated'>
          Last Updated On: A Few {showLiveData ? 'Minutes' : 'Days'} Ago
        </div>

        {loading && Array.from({ length: 10 }).map((_, index) => {
          return (
            <RowPlaceholder key={index} />
          )
        })}

        {!loading && (
          <div className='content'>
            <div>
              <div className={`row heading${showLiveData ? ' live' : ''}`}>
                <div>Account</div>
                <div>Policy</div>
                <div>Liquidity</div>
                <div>Points</div>
                <div>Level</div>
                {!showLiveData && (
                  <div>Proof</div>
                )}
              </div>

              {(showLiveData ? merkleTreeLive : merkleTree).map((row, index) => {
                return (
                  <div className={`row${showLiveData ? ' live' : ''}`} key={index}>
                    <div className='address'>{row.account}</div>
                    <div>{formatDollar(row.policy)}</div>
                    <div>{formatDollar(row.liquidity)}</div>
                    <div className='points'>{formatNumber(parseFloat(row.points))}</div>
                    <div>{row.level}</div>
                    {!showLiveData && (
                      <div className='view-proof'>
                        <button onClick={() => {
                          setSelectedLeafIndex(index)
                        }}
                        >View Proof
                        </button>
                      </div>
                    )}
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
          <div className='label'>Current Merkle Root:</div>
          <div className='value'>{merkleRoot}</div>
        </div>
        <div className='root'>
          <div className='label'>Live Merkle Root:</div>
          <div className='value'>{merkleRootLive}</div>
        </div>
        {showUpdateRootButton && (merkleRoot !== merkleRootLive) && (
          <Button size='xl' disabled={busy} onClick={updateMerkleRoot}>Set Merkle Root</Button>
        )}

        <ProofModal merkleTree={merkleTree} merkleLeaf={merkleTree[selectedLeafIndex]} merkleRoot={merkleRoot} merkleRootLive={merkleRootLive} open={selectedLeafIndex !== -1} setOpen={() => { setSelectedLeafIndex(-1) }} />

      </div>
    </section>
  )
}

export default MerkleProofView
