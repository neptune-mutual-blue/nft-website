import Head from 'next/head'

import { getFullUrl } from '@/utils/get-full-url'

const domainName = process.env.NEXT_PUBLIC_DOMAIN_NAME ||
'https://nft.neptunemutual.com'

const Seo = ({ title, description, ogImage, ogImageAlt, ogURL, ogLocale, ogType }) => {
  const siteURL = getFullUrl(domainName + ogURL, false)
  const imageURL = getFullUrl(domainName + ogImage, false)

  return (
    <Head>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name='description' content={description} />
      <link rel='canonical' href={siteURL} />

      {/* Open Graph / Facebook */}
      <meta property='og:title' content={title} />
      <meta property='og:description' content={description} />
      <meta property='og:image' content={imageURL} />
      <meta property='og:url' content={siteURL} />
      <meta property='og:locale' content={ogLocale || 'en'} />
      <meta property='og:type' content={ogType || 'website'} />

      {/* Twitter  */}
      <meta name='twitter:title' content={title} />
      <meta property='twitter:site' content='@neptunemutual' />
      <meta property='twitter:creator' content='@neptunemutual' />
      <meta property='twitter:description' content={description} />
      <meta property='twitter:image' content={imageURL} />
      <meta property='twitter:image:alt' content={ogImageAlt} />
      <meta property='twitter:card' content='summary_large_image' />

    </Head>
  )
}

export default Seo
