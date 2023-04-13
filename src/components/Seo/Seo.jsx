import Head from 'next/head'

const domainName = process.env.NEXT_PUBLIC_DOMAIN_NAME ||
'https://nft.neptunemutual.com'

const Seo = ({ title, description, ogImage, ogImageAlt, ogURL, ogLocale, ogType }) => {
  return (
    <Head>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name='description' content={description} />
      <link rel='canonical' href={domainName + ogURL} />

      {/* Open Graph / Facebook */}
      <meta property='og:title' content={title} />
      <meta property='og:description' content={description} />
      <meta property='og:image' content={domainName + ogImage} />
      <meta property='og:url' content={domainName + ogURL} />
      <meta property='og:locale' content={ogLocale || 'en'} />
      <meta property='og:type' content={ogType || 'website'} />

      {/* Twitter  */}
      <meta name='twitter:title' content={title} />
      <meta property='twitter:site' content='@neptunemutual' />
      <meta property='twitter:creator' content='@neptunemutual' />
      <meta property='twitter:description' content={description} />
      <meta property='twitter:image' content={domainName + ogImage} />
      <meta property='twitter:image:alt' content={ogImageAlt} />
      <meta property='twitter:card' content='summary_large_image' />

    </Head>
  )
}

export default Seo
