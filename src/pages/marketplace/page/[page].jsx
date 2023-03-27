import Head from 'next/head'

import { getSSRData } from '@/utils/ssr'
import { Marketplace } from '@/views/Marketplace'

export async function getServerSideProps (context) {
  const { data, marketplaceFilters, pageData } = await getSSRData(context)

  return {
    props: {
      data,
      marketplaceFilters,
      pageData
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
        data={props.data}
        filters={props.marketplaceFilters}
        pageData={props.pageData}
      />
    </>
  )
}
