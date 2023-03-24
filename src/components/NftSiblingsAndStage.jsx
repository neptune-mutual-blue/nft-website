import { Tags } from '@/components/Tags/Tags'

const NftSiblingsAndStage = ({ nft }) => {
  return (
    <div className='siblings and stage'>
      <div>{nft.siblings} siblings</div>
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
