import { Hero } from '@/views/marketplace/Hero'
import { MarketPlaceSection } from '@/views/marketplace/MarketplaceSection'

const Marketplace = ({ data, filters, pageData }) => {
  return (
    <>
      <Hero />

      <MarketPlaceSection
        data={data}
        filters={filters}
        pageData={pageData}
      />

    </>
  )
}

export { Marketplace }
