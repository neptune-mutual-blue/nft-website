import {
  useCallback,
  useEffect,
  useState
} from 'react'

import { NftApi } from '@/service/nft-api'

const useMerkleLeaf = (address) => {
  const [merkleLeaf, setMerkleLeaf] = useState()
  const [loading, setLoading] = useState(false)

  const getBoundToken = useCallback(async () => {
    setLoading(true)

    try {
      const response = await NftApi.getMerkleLeaf(address)

      if (response && response.data && response.data.length > 0) {
        setMerkleLeaf(response.data[0])
      }
    } catch (err) {
      console.error(err)
    }

    setLoading(false)
  }, [address])

  useEffect(() => {
    if (address) {
      getBoundToken()
    }
  }, [address, getBoundToken])

  return {
    merkleLeaf,
    loading
  }
}

export default useMerkleLeaf
