import CountUp from '@/components/CountUp/CountUp'
import { Tags } from '@/components/Tags/Tags'

const NftSiblingsAndStage = ({ nft }) => {
  return (
    <div className='siblings and stage'>
      <div><CountUp number={nft.siblings} /> siblings</div>
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
      </div>
    </div>
  )
}

export { NftSiblingsAndStage }
