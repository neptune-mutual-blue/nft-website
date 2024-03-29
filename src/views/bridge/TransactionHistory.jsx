import {
  Fragment,
  useEffect,
  useMemo,
  useState
} from 'react'

import Link from 'next/link'

import { Breadcrumb } from '@/components/Breadcrumb/Breadcrumb'
import { ConnectWallet } from '@/components/ConnectWallet/ConnectWallet'
import { InputWithIcon } from '@/components/InputWithIcon/InputWithIcon'
import { bridgeConfig } from '@/config/bridge'
import { useUserNfts } from '@/hooks/data/useUserNfts'
import { NftApi } from '@/service/nft-api'
import { BridgingResults } from '@/views/bridge/modals/BridgingResults'
import { columns } from '@/views/bridge/TableComponents'
import { RowPlaceholder } from '@/views/merkle-proof/RowPlaceholder'
import { useWeb3React } from '@web3-react/core'

const TransactionHistory = () => {
  const crumbs = [
    {
      link: '/',
      name: 'NFT Home'
    },
    {
      link: '/my-collection',
      name: 'My Collection'
    },
    {
      link: '/my-collection/bridge',
      name: 'NFT Bridge'
    },
    {
      link: '#',
      name: 'Transactions'
    }
  ]

  const [query, setQuery] = useState('')
  const [sortType, setSortType] = useState(null)

  const [transactions, setTransactions] = useState([])
  const [loading, setLoading] = useState(false)

  const { account, active } = useWeb3React()

  const getTransactions = async () => {
    setLoading(true)

    try {
      const response = await NftApi.getBridgeTransactions(account)

      console.log(transactions)

      setTransactions(response.data)
    } catch (err) {
      console.error(err)
    }

    setLoading(false)
  }

  useEffect(() => {
    if (account) {
      getTransactions()
    } else {
      setTransactions([])
    }
    // eslint-disable-next-line
  }, [account])

  const filteredData = useMemo(() => {
    if (!query) { return transactions }

    return transactions.filter(({ tokens, chainId, dstChainId }) => {
      const dstChain = Object.values(bridgeConfig).find((x) => { return x.lzChainId === parseInt(dstChainId) })

      return dstChain.chainId.toString().toLowerCase().includes(query.toLowerCase()) ||
        tokens.map(token => { return token.name }).join(' ').toLowerCase().includes(query.toLowerCase()) ||
        chainId.toLowerCase().includes(query.toLowerCase())
    })
  }, [query, transactions])

  const sortedData = useMemo(() => {
    if (!sortType) { return filteredData }

    const { col, type } = sortType
    return filteredData.sort((a, b) => {
      if (col === 'date') { return type === 'asc' ? Number(a.timestamp) - Number(b.timestamp) : Number(b.timestamp) - Number(a.timestamp) }

      if (col === 'nft') { return type === 'asc' ? a.nftTitle.localeCompare(b.nftTitle) : b.nftTitle.localeCompare(a.nftTitle) }

      return 0
    })
  }, [sortType, filteredData])

  const [transaction, setTransaction] = useState()

  const empty = filteredData.length === 0

  const { userNFTs } = useUserNfts(account)

  return (
    <div className='nft bridge transaction history'>
      <section>
        <div className='breadcrumb and connect wallet'>
          <Breadcrumb items={crumbs} />
          <ConnectWallet />
        </div>

        <BridgingResults
          departureChainId={transaction?.sourceChainId}
          destinationChainId={transaction?.destinationChainId}
          open={!!transaction}
          close={() => {
            setTransaction(undefined)
          }}
          date={transaction?.date}
          transaction={transaction}
          nfts={userNFTs.filter((nft) => { return (transaction?.tokens ?? []).includes(nft.tokenId) })}
        />

        <div className='content'>
          <div className='table header'>
            <h3>
              NFT Bridge Transaction History
            </h3>
            <InputWithIcon placeholder='Search' onChange={val => { return setQuery(val) }} />
          </div>

          <div className='table wrapper'>
            <table>
              <thead>
                <tr>
                  {
                  columns.map(({ header }, idx) => {
                    return (
                      header((sortType, col) => { return setSortType({ col, type: sortType }) }, idx)
                    )
                  })
                }
                </tr>
              </thead>

              <tbody>
                {!loading && (
                  !empty
                    ? sortedData.map((data, idx2) => {
                      return (
                        <Fragment key={`row-${idx2}`}>
                          <tr>

                            {columns.map(({ render }, idx3) => { return idx3 === columns.length - 1 ? render(data, `row-${idx2}-col-${idx3}`, setTransaction) : render(data, `row-${idx2}-col-${idx3}`) })}
                          </tr>
                        </Fragment>
                      )
                    })
                    : (
                      <tr>
                        <td className='empty' colSpan={columns.length} align='center'>
                          <p>{active ? query ? 'No transactions found' : 'You have made no transactions yet' : 'Connect Your Wallet'}</p>
                          {active && (
                            <Link href='/my-collection/bridge'>
                              Bridge NFT
                            </Link>
                          )}
                        </td>
                      </tr>
                      )
                )}
              </tbody>

            </table>

            {loading && Array.from({ length: 10 }).map((_, index) => {
              return (
                <RowPlaceholder key={index} />
              )
            })}

          </div>
          {/* <Pagination currentPage={1} totalPages={10} getHref={page => { return `/bridge-transactions/page/${page}` }} /> */}
        </div>
      </section>
    </div>
  )
}

export { TransactionHistory }
