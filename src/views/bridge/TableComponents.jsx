import { copyToClipboard } from '@/utils/copy-to-clipboard'
import { getExplorerAddressURL } from '@/utils/get-explorer-url'

const { Icon } = require('@/elements/Icon')
const { getDateInFormat } = require('@/utils/date')
const { truncateAddress } = require('@/utils/nft')
const { useState } = require('react')

const HeaderCol = ({ title, align = 'left', sort = false, onSortChange = () => {} }) => {
  const [sortType, setSortType] = useState('desc')

  return (
    <th align={align}>
      {
        sort
          ? (
            <button
              onClick={() => {
                const _sortType = sortType === 'desc' ? 'asc' : 'desc'
                setSortType(_sortType)
                onSortChange(_sortType)
              }}
              data-sorttype={sortType}
            >
              {title}
              <Icon variant='arrow-down' />
            </button>
            )
          : title
      }
    </th>
  )
}

const columns = [
  {
    header: (onSortChange, key) => { return <HeaderCol title='Date' sort onSortChange={sortType => { return onSortChange(sortType, 'date') }} key={key} /> },
    render: (data, key) => { return <RenderDate timestamp={data.timestamp} key={key} /> }
  },
  {
    header: (onSortChange, key) => { return <HeaderCol title='NFT' sort onSortChange={sortType => { return onSortChange(sortType, 'nft') }} key={key} /> },
    render: (data, key) => { return <RenderNFTTitle name={data.nftTitle} key={key} /> }
  },
  {
    header: (_, key) => { return <HeaderCol title='DEP/DST Chain' key={key} /> },
    render: (data, key) => { return <RenderChainInfo depChainId={data.depChainId} destChainId={data.destChainId} key={key} /> }
  },
  {
    header: (_, key) => { return <HeaderCol title='Departure Address' key={key} /> },
    render: (data, key) => { return <RenderAddress address={data.depAddress} chainId={data.depChainId} key={key} /> }
  },
  {
    header: (_, key) => { return <HeaderCol title='Destination Address' key={key} /> },
    render: (data, key) => { return <RenderAddress address={data.destAddress} chainId={data.destChainId} key={key} /> }
  },
  {
    header: (_, key) => { return <HeaderCol title='' key={key} /> },
    render: (data, key) => { return <RenderAction txHash={data.txHash} key={key} /> }
  }
]

export { columns }

const RenderDate = ({ timestamp }) => {
  return (
    <td className='date'>
      <span title={new Date(timestamp)}>
        {getDateInFormat(timestamp)}
      </span>
    </td>
  )
}

const RenderNFTTitle = ({ name }) => {
  return (
    <td className='nft'>
      {name}
    </td>
  )
}

const RenderChainInfo = ({ depChainId, destChainId }) => {
  const chainLogos = {
    1: 'ethereum-round-blue',
    56: 'bnbchain'
  }

  return (
    <td className='chain'>
      <div>
        <Icon variant={chainLogos[depChainId]} />
        <Icon variant='arrow-right' />
        <Icon variant={chainLogos[destChainId]} />
      </div>
    </td>
  )
}

const RenderAddress = ({ address, chainId }) => {
  const link = getExplorerAddressURL(address, chainId)

  return (
    <td className='address'>
      <div>
        <span>{truncateAddress(address)}</span>

        <button onClick={() => { return copyToClipboard(address) }}>
          <Icon variant='copy-01' size='md' />
        </button>

        <a href={link} target='_blank'>
          <Icon variant='link-external-01' size='md' />
        </a>
      </div>
    </td>
  )
}

const RenderAction = ({ txHash }) => {
  return (
    <td className='action'>
      <a href={`/bridge/receipt/${txHash}`} target='_blank'>
        View Receipt
      </a>
    </td>
  )
}
