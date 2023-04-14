import CountUp from '@/components/CountUp/CountUp'
import { Tags } from '@/components/Tags/Tags'

const NftSiblingsAndStage = ({ nft }) => {
  return (
    <div className='siblings and stage'>
      <div><CountUp localized number={nft.siblings} /> siblings</div>
      {nft.stage !== null &&
        <div>
          <Tags
            tags={[
              {
                id: '1',
                slug: '1',
                text: nft.stage,
                color: 'nft-stage'
              }
            ]}
          />
        </div>}
    </div>
  )
}

export { NftSiblingsAndStage }
