import '@/styles/global.scss'

import { useEffect } from 'react'

import { useRouter } from 'next/router'
import Script from 'next/script'

import { ToastProvider } from '@/components/Toast/Toast'
import { LoaderProvider } from '@/contexts/LoaderContext'
import { ThemeProvider } from '@/contexts/ThemeContext'
import { getLibrary } from '@/lib/connect-wallet/web3'
import { Web3ReactProvider } from '@web3-react/core'

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
          font-family: Inter, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
        }
      `}
      </style>

      <Web3ReactProvider getLibrary={getLibrary}>
        <ToastProvider>
          <LoaderProvider>
            <ThemeProvider>
              <Component {...pageProps} />
            </ThemeProvider>
          </LoaderProvider>
        </ToastProvider>

      </Web3ReactProvider>

      <Script strategy='lazyOnload' src='/scripts/hamburger.js' />
      <Script strategy='lazyOnload' src='/scripts/mega-menu.js' />
      <Script strategy='lazyOnload' src='/scripts/video.js' />
    </>
  )
}
