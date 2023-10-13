import Link from 'next/link'

import { bridgeConfig } from '@/config/bridge'
import { AppConstants } from '@/constants/AppConstants'
import { getDateInFormat } from '@/utils/date'

import NpmDarkLogo from '../../elements/npm/npm-logo-dark-mode.svg'
import NpmLightLogo from '../../elements/npm/npm-logo-light-mode.svg'

const TransactionReceipt = ({ txDetails }) => {
  const nftDomain = new URL(AppConstants.domainName)

  const tx = txDetails.messages?.[0]

  const depChain = Object.values(bridgeConfig).find((x) => { return x.lzChainId === parseInt(tx.srcChainId) })
  const dstChain = Object.values(bridgeConfig).find((x) => { return x.lzChainId === parseInt(tx.dstChainId) })

  const details = {
    receiptNo: '001',
    timestamp: tx?.created * 1000,
    nftTitle: 'Diabolic Merman Serpent #172001',
    depChain: depChain?.chainName,
    destChain: dstChain?.chainName,
    depAddress: tx?.srcUaAddress,
    destAddress: tx?.dstUaAddress,
    depHash: tx?.srcTxHash,
    destHash: tx?.dstTxHash,
    txHash: tx?.srcBlockHash,
    nfts: [
      'Diabolic Merman Serpent #172001',
      'Sabersquatch #153771',
      'Epic Aquavallo #145216'
    ],
    fees: '0.0015 ETH'
  }

  return (
    <main className='transaction receipt'>
      <div className='content'>
        <div className='header'>
          <a className='logo' href={AppConstants.neptunemutualOrigin}>
            <span className='sr-only'>Neptune Mutual</span>
            <span className='light only'><NpmLightLogo /></span>
            <span className='dark only'><NpmDarkLogo /></span>
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
            <KeyVal keyText='Departure Chain' val={details.depChain} />
            <KeyVal keyText='Departure Address' val={details.depAddress} />
            <KeyVal keyText='Destination Chain' val={details.destChain} />
            <KeyVal keyText='Destination Address' val={details.destAddress} />
            <KeyVal keyText='Fees Paid' val={details.fees} />
          </div>
        </div>

        <hr />

        <div className='footer'>
          <KeyVal keyText='Departure Hash' val={details.depHash} />
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
