import { ThemeProvider } from '@/contexts/ThemeContext'
import { BaseLayout } from '@/layouts/BaseLayout'
import { getLibrary } from '@/lib/connect-wallet/web3'
import '@/styles/global.scss'
import { Web3ReactProvider } from '@web3-react/core'

import { Inter } from 'next/font/google'

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
    </>
  )
}
