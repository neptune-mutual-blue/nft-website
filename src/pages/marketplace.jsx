import Head from 'next/head'

import { Footer } from '@/components/Footer/Footer'
import { getMarketplaceFilters, searchMarketplace } from '@/services/marketplace-api'
import { Marketplace } from '@/views/Marketplace'

export async function getStaticProps () {
  const initialMarketplaceData = await (await searchMarketplace()).data
  const marketplaceFilters = await (await getMarketplaceFilters()).data

  return {
    props: {
      initialMarketplaceData,
      marketplaceFilters
    }
  }
}

export default function MarketplacePage (props) {
  return (
    <>
      <Head>
        <title>@todo</title>
        <meta name='description' content='@todo' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Marketplace
        initialData={props.initialMarketplaceData}
        filters={props.marketplaceFilters}
      />

      <main>
        <Footer />
      </main>
    </>
  )
}
