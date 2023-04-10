import '@/styles/global.scss'

import { useEffect } from 'react'

import { Inter } from 'next/font/google'
import { useRouter } from 'next/router'
import Script from 'next/script'

import { LoaderProvider } from '@/contexts/LoaderContext'
import { ThemeProvider } from '@/contexts/ThemeContext'
import { getLibrary } from '@/lib/connect-wallet/web3'
import { Web3ReactProvider } from '@web3-react/core'

const inter = Inter({ subsets: ['latin'] })

export default function App ({ Component, pageProps }) {
  const router = useRouter()

  const initialize = () => {
    window?.hamburger?.()
    window?.megaMenu?.()
    window?.video?.()
  }

  useEffect(() => {
    initialize()
  }, [router.pathname])

  return (
    <>
      <style jsx global>{`
        html {
          font-family: ${inter.style.fontFamily};
        }
      `}
      </style>

      <Web3ReactProvider getLibrary={getLibrary}>
        <LoaderProvider>
          <ThemeProvider>
            <Component {...pageProps} />
          </ThemeProvider>
        </LoaderProvider>
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
