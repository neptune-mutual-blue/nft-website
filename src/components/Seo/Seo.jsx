import Head from 'next/head'

const Seo = ({ title, description, ogImage, ogImageAlt, ogURL }) => {
  return (
    <Head>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name='description' content={description} />

      {/* Open Graph / Facebook */}
      <meta property='og:title' content={title} />
      <meta property='og:description' content={description} />
      <meta property='og:image' content={ogImage} />
      <meta property='og:url' content={ogURL} />

      {/* Twitter  */}
      <meta name='twitter:title' content={title} />
      <meta property='twitter:description' content={description} />
      <meta property='twitter:image' content={ogImage} />
      <meta property='twitter:image:alt' content={ogImageAlt} />
    </Head>
  )
}

export default Seo
