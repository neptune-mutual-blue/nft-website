import { Hero } from '@/views/marketplace/Hero'
import { MarketPlaceSection } from '@/views/marketplace/MarketplaceSection'

const Marketplace = ({ initialData, filters }) => {
  return (
    <>
      <Hero />

      <MarketPlaceSection
        initialData={initialData}
        filters={filters}
      />

    </>
  )
}

export { Marketplace }
