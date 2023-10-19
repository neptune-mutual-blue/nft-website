import { CustomTooltip } from '@/components/Tooltip/Tooltip'
import { bridgeConfig } from '@/config/bridge'
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
    render: (data, key) => { return <RenderDate timestamp={data.blockTimestamp} key={key} /> }
  },
  {
    header: (onSortChange, key) => { return <HeaderCol title='NFT' sort onSortChange={sortType => { return onSortChange(sortType, 'nft') }} key={key} /> },
    render: (data, key) => { return <RenderNFTTitle nfts={data.tokens} key={key} /> }
  },
  {
    header: (_, key) => { return <HeaderCol title='SRC/DST Chain' key={key} /> },
    render: (data, key) => { return <RenderChainInfo depChainId={data.chainId} destChainId={data.dstChainId} key={key} /> }
  },
  {
    header: (_, key) => { return <HeaderCol title='Source Address' key={key} /> },
    render: (data, key) => { return <RenderAddress address={data.sender} chainId={data.chainId} key={key} /> }
  },
  {
    header: (_, key) => { return <HeaderCol title='Destination Address' key={key} /> },
    render: (data, key) => {
      const dstChain = Object.values(bridgeConfig).find((x) => { return x.lzChainId === parseInt(data.dstChainId) })

      return <RenderAddress address={data.sender} chainId={dstChain?.chainId} key={key} />
    }
  },
  {
    header: (_, key) => { return <HeaderCol title='' key={key} /> },
    render: (data, key, setTransaction) => { return <RenderAction setTransaction={setTransaction} data={data} key={key} /> }
  }
]

export { columns }

const RenderDate = ({ timestamp }) => {
  return (
    <td className='date'>
      <span title={new Date(timestamp * 1000)}>
        {getDateInFormat(timestamp * 1000)}
      </span>
    </td>
  )
}

const RenderNFTTitle = ({ nfts }) => {
  return (
    <td className='nft'>
      <div className='title'>

        {nfts.map(nft => {
          return (
            <div key={nft.name}>
              {nft.name}
            </div>
          )
        })}
      </div>
    </td>
  )
}

const RenderChainInfo = ({ depChainId, destChainId }) => {
  const depChain = bridgeConfig[depChainId]
  const dstChain = Object.values(bridgeConfig).find((x) => { return x.lzChainId === parseInt(destChainId) })

  return (
    <td className='chain'>
      <div>
        <CustomTooltip text={depChain?.chainName}>
          <img src={depChain?.image} alt={depChain?.chainName} title={depChain?.chainName} />
        </CustomTooltip>
        <Icon variant='arrow-right' />
        <CustomTooltip text={dstChain?.chainName}>
          <img src={dstChain?.image} alt={dstChain?.chainName} title={dstChain?.chainName} />
        </CustomTooltip>
      </div>
    </td>
  )
}

const RenderAddress = ({ address, chainId }) => {
  const link = getExplorerAddressURL(address, chainId)

  return (
    <td className='address'>
      <div>
        <CustomTooltip text={address}>
          <div>
            <span>{address ? truncateAddress(address) : ''}</span>
          </div>
        </CustomTooltip>

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

const RenderAction = ({ data, setTransaction }) => {
  const depChain = bridgeConfig[data.chainId]
  const dstChain = Object.values(bridgeConfig).find((x) => { return x.lzChainId === parseInt(data.dstChainId) })

  return (
    <td className='action'>
      <button
        onClick={() => {
          setTransaction({
            sourceChainId: depChain.chainId,
            destinationChainId: dstChain.chainId,
            date: data.blockTimestamp * 1000,
            hash: data.transactionHash,
            tokens: data.tokens.map(token => { return Number(token.name.split('#')[1]) })
          })
        }}
      >
        View Detail
      </button>
    </td>
  )
}
