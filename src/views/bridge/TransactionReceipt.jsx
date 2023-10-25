import Link from 'next/link'

import { bridgeConfig } from '@/config/bridge'
import { AppConstants } from '@/constants/AppConstants'
import { chains } from '@/lib/connect-wallet/utils/switch-network'
import { formatNpmToken } from '@/utils/currencyHelpers'
import { getDateInFormat } from '@/utils/date'

import NpmLightLogo from '../../elements/npm/npm-logo-light-mode.svg'

const TransactionReceipt = ({ txDetails }) => {
  const nftDomain = new URL(AppConstants.domainName)

  const tx = txDetails.messages?.[0]

  const tokenIds = txDetails.tokenIds

  const depChain = Object.values(bridgeConfig).find((x) => { return x.lzChainId === parseInt(tx.srcChainId) })
  const dstChain = Object.values(bridgeConfig).find((x) => { return x.lzChainId === parseInt(tx.dstChainId) })

  const depNativeCurrency = chains[depChain.chainId].nativeCurrency

  const details = {
    receiptNo: `${tx?.srcChainId}-${tx?.dstChainId}-${tx?.srcUaNonce}`,
    timestamp: tx?.created * 1000,
    nftTitle: 'Diabolic Merman Serpent #172001',
    depChain: depChain?.chainName,
    destChain: dstChain?.chainName,
    depAddress: tx?.srcUaAddress,
    destAddress: tx?.dstUaAddress,
    depHash: tx?.srcTxHash,
    destHash: tx?.dstTxHash,
    txHash: tx?.srcBlockHash,
    nfts: tokenIds.map(tokenId => { return `#${tokenId}` }),
    fees: formatNpmToken(txDetails.fees, depNativeCurrency.decimals, depNativeCurrency.symbol)
  }

  return (
    <main className='transaction receipt'>
      <div className='content'>
        <div className='header'>
          <a className='logo' href={AppConstants.neptunemutualOrigin}>
            <span className='sr-only'>Neptune Mutual</span>
            <NpmLightLogo />
          </a>

          <Link href={nftDomain.href}>
            {nftDomain.hostname}
          </Link>
        </div>

        <hr className='header' />

        <div className='title'>
          <h1>NFT Bridging Receipt</h1>
          <p><strong>Date:</strong> {getDateInFormat(details.timestamp)}</p>
          <p><strong>Receipt no:</strong> {details.receiptNo}</p>
        </div>

        <hr />

        <div className='details'>
          <p>NFT Name</p>

          <div className='nfts'>
            {
            details.nfts.map((nft, idx) => {
              return (
                <p key={idx}>
                  <strong>
                    {idx + 1}. {nft}
                  </strong>

                </p>
              )
            })
          }
          </div>

          <div className='kv wrapper'>
            <KeyVal keyText='Source Chain' val={details.depChain} />
            <KeyVal keyText='Source Address' val={details.depAddress} />
            <KeyVal keyText='Destination Chain' val={details.destChain} />
            <KeyVal keyText='Destination Address' val={details.destAddress} />
            <KeyVal keyText='Fees Paid' val={details.fees.long} />
          </div>
        </div>

        <hr />

        <div className='footer'>
          <KeyVal keyText='Source Hash' val={details.depHash} />
          <KeyVal keyText='Destination Hash' val={details.destHash} />
        </div>
      </div>
    </main>
  )
}

const KeyVal = ({ keyText, val }) => {
  return (
    <div className='key val'>
      <strong>{keyText}</strong>
      <p>{val}</p>
    </div>
  )
}

export { TransactionReceipt }
