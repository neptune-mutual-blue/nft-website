import '@/styles/global.scss'

import { Inter } from 'next/font/google'
import Script from 'next/script'

import { ThemeProvider } from '@/contexts/ThemeContext'
import { BaseLayout } from '@/layouts/BaseLayout'
import { getLibrary } from '@/lib/connect-wallet/web3'
import { Web3ReactProvider } from '@web3-react/core'

const inter = Inter({ subsets: ['latin'] })

export default function App ({ Component, pageProps }) {
  return (
    <>
      <style jsx global>{`
        html {
          font-family: ${inter.style.fontFamily};
        }
      `}
      </style>

      <Web3ReactProvider getLibrary={getLibrary}>
        <ThemeProvider>
          <BaseLayout>
            <Component {...pageProps} />
          </BaseLayout>
        </ThemeProvider>
      </Web3ReactProvider>

      {/* eslint-disable-next-line */}
      <Script strategy='beforeInteractive' src='/scripts/hamburger.js' />
      {/* eslint-disable-next-line */}
      <Script strategy='beforeInteractive' src='/scripts/mega-menu.js' />
      {/* eslint-disable-next-line */}
      <Script strategy='beforeInteractive' src='/scripts/video.js' />
    </>
  )
}
