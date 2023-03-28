import { ThemeProvider } from '@/contexts/ThemeContext'
import { BaseLayout } from '@/layouts/BaseLayout'
import '@/styles/global.scss'

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

      <ThemeProvider>
        <BaseLayout>
          <Component {...pageProps} />
        </BaseLayout>
      </ThemeProvider>
    </>
  )
}
