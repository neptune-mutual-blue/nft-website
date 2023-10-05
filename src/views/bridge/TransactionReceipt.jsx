import { AppConstants } from '@/constants/AppConstants'

import NpmDarkLogo from '../../elements/npm/npm-logo-dark-mode.svg'
import NpmLightLogo from '../../elements/npm/npm-logo-light-mode.svg'
import Link from 'next/link'
import { getDateInFormat } from '@/utils/date'

const mock = {
  receiptNo: '001',
  timestamp: 1696407710592,
  nftTitle: 'Diabolic Merman Serpent #172001',
  depChain: 'ETH',
  destChain: 'BSC',
  depAddress: '0x8JDAE5a084EC18558J78e98J38d1A67c79F6C8J6',
  destAddress: '0x8R4AEga0A4EC1AgkAJ7Ae9AJ3Ad1A67c79F6CAJ6',
  depHash: '0x0Edbd64c91409ad3Bb413Ab3DF7fcd786',
  destHash: '0x63ef5603e38996de2d810aaf1193ef19168ca2807a4f8557568653772740235b',
  txHash: '0x8dbc9d96f7ade6e5afb1d912056245f08c24d8995dc313a2da570416f27afd06',
  nfts: [
    'Diabolic Merman Serpent #172001',
    'Sabersquatch #153771',
    'Epic Aquavallo #145216'
  ],
  fees: '0.0015 ETH'
}

const TransactionReceipt = () => {
  const nftDomain = new URL(AppConstants.domainName)
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
          <p><strong>Date:</strong> {getDateInFormat(mock.timestamp)}</p>
          <p><strong>Receipt no:</strong> {mock.receiptNo}</p>
        </div>

        <hr />

        <div className='details'>
          <p>NFT Name</p>

          <div className='nfts'>
            {
            mock.nfts.map((nft, idx) => {
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
            <KeyVal keyText='Departure Chain' val={mock.depChain} />
            <KeyVal keyText='Departure Address' val={mock.depAddress} />
            <KeyVal keyText='Destination Chain' val={mock.destChain} />
            <KeyVal keyText='Destination Address' val={mock.destAddress} />
            <KeyVal keyText='Fees Paid' val={mock.fees} />
          </div>
        </div>

        <hr />

        <div className='footer'>
          <KeyVal keyText='Departure Hash' val={mock.depHash} />
          <KeyVal keyText='Destination Hash' val={mock.destHash} />
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
