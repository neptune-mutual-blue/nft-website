import {
  Head,
  Html,
  Main,
  NextScript
} from 'next/document'

export default function Document () {
  return (
    <Html lang='en'>
      <Head>
        {/* Primary Meta Tags */}
        <meta name='author' content='Neptune Mutual' />

        {/* Open Graph / Facebook */}
        <meta property='og:locale' content='en' />
        <meta property='og:type' content='website' />
        <meta property='og:image:type' content='image/*' />
        <meta property='og:site_name' content='Neptune Mutual NFT' />

        {/* Twitter  */}
        <meta property='twitter:site' content='@neptunemutual' />
        <meta property='twitter:creator' content='@neptunemutual' />
        <meta name='twitter:card' content='summary_large_image' />

        {/* Favicon  */}
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
