import { Breadcrumb } from '@/components/Breadcrumb/Breadcrumb'
import { ConnectWallet } from '@/components/ConnectWallet/ConnectWallet'
import { InputWithIcon } from '@/components/InputWithIcon/InputWithIcon'
import { columns } from '@/views/bridge/TableComponents'
import { Pagination } from '@/views/marketplace/Pagination'
import Link from 'next/link'
import { useMemo, useState } from 'react'

const mocks = [
  {
    timestamp: 1696407710592,
    nftTitle: 'Diabolic Merman Serpent #172001',
    depChainId: 1,
    destChainId: 56,
    depAddress: '0x8JDAE5a084EC18558J78e98J38d1A67c79F6C8J6',
    destAddress: '0x8R4AEga0A4EC1AgkAJ7Ae9AJ3Ad1A67c79F6CAJ6',
    txHash: '0x8dbc9d96f7ade6e5afb1d912056245f08c24d8995dc313a2da570416f27afd06'
  },
  {
    timestamp: 1696407720592,
    nftTitle: 'Siabolic Merman Serpent #172001',
    depChainId: 1,
    destChainId: 56,
    depAddress: '0x8JDAE5a084EC18558J78e98J38d1A67c79F6C8J6',
    destAddress: '0x8R4AEga0A4EC1AgkAJ7Ae9AJ3Ad1A67c79F6CAJ6',
    txHash: '0x8dbc9d96f7ade6e5afb1d912056245f08c24d8995dc313a2da570416f27afd06'
  },
  {
    timestamp: 1696407720582,
    nftTitle: 'Diabolic Merman Serpents #172001',
    depChainId: 1,
    destChainId: 56,
    depAddress: '0x8JDAE5a084EC18558J78e98J38d1A67c79F6C8J6',
    destAddress: '0x8R4AEga0A4EC1AgkAJ7Ae9AJ3Ad1A67c79F6CAJ6',
    txHash: '0x8dbc9d96f7ade6e5afb1d912056245f08c24d8995dc313a2da570416f27afd06'
  },
  {
    timestamp: 1696557720582,
    nftTitle: 'Diabolic Merman H Serpent #172001',
    depChainId: 1,
    destChainId: 56,
    depAddress: '0x8JDAE5a084EC18558J78e98J38d1A67c79F6C8J6',
    destAddress: '0x8R4AEga0A4EC1AgkAJ7Ae9AJ3Ad1A67c79F6CAJ6',
    txHash: '0x8dbc9d96f7ade6e5afb1d912056245f08c24d8995dc313a2da570416f27afd06'
  },
  {
    timestamp: 1696557743582,
    nftTitle: 'Biabolic Merman Serpent #172001',
    depChainId: 1,
    destChainId: 56,
    depAddress: '0x8JDAE5a084EC18558J78e98J38d1A67c79F6C8J6',
    destAddress: '0x8R4AEga0A4EC1AgkAJ7Ae9AJ3Ad1A67c79F6CAJ6',
    txHash: '0x8dbc9d96f7ade6e5afb1d912056245f08c24d8995dc313a2da570416f27afd06'
  }
]
const empty = true

const TransactionHistory = () => {
  const crumbs = [
    {
      link: '/',
      name: 'NFT Home'
    },
    {
      link: '#',
      name: 'My Collection'
    }
  ]

  const [query, setQuery] = useState('')
  const [sortType, setSortType] = useState(null)

  const filteredData = useMemo(() => {
    if (!query) { return mocks }

    return mocks.filter(({ nftTitle, depAddress, destAddress }) => {
      return nftTitle.toLowerCase().includes(query.toLowerCase()) ||
        depAddress.toLowerCase().includes(query.toLowerCase()) ||
        destAddress.toLowerCase().includes(query.toLowerCase())
    })
  }, [query, mocks])

  const sortedData = useMemo(() => {
    if (!sortType) { return filteredData }

    const { col, type } = sortType
    return filteredData.sort((a, b) => {
      if (col === 'date') { return type === 'asc' ? Number(a.timestamp) - Number(b.timestamp) : Number(b.timestamp) - Number(a.timestamp) }

      if (col === 'nft') { return type === 'asc' ? a.nftTitle.localeCompare(b.nftTitle) : b.nftTitle.localeCompare(a.nftTitle) }

      return 0
    })
  }, [sortType, filteredData])

  return (
    <div className='nft bridge transaction history'>
      <section>
        <div className='breadcrumb and connect wallet'>
          <Breadcrumb items={crumbs} />
          <ConnectWallet />
        </div>

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
                {
                  !empty
                    ? sortedData.map((data, idx2) => {
                      return (
                        <tr key={`row-${idx2}`}>
                          {columns.map(({ render }, idx3) => { return render(data, `row-${idx2}-col-${idx3}`) })}
                        </tr>
                      )
                    })
                    : (
                      <tr>
                        <td className='empty' colSpan={columns.length} align='center'>
                          <p>You have made no transactions yet</p>
                          <Link href='/my-collection/bridge'>
                            Bridge NFT
                          </Link>
                        </td>
                      </tr>
                      )
                }
              </tbody>
            </table>

          </div>
          <Pagination currentPage={1} totalPages={10} getHref={page => { return `/bridge-transactions/page/${page}` }} />
        </div>
      </section>
    </div>
  )
}

export { TransactionHistory }
