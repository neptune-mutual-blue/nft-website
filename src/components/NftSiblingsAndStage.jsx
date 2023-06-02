import { Tags } from '@/components/Tags/Tags'

const NftSiblingsAndStage = ({ nft }) => {
  return (
    <div className='siblings and stage'>
      <div>{nft.siblings} siblings</div>
      {nft.stage !== null &&
        <div>
          <Tags
            tags={[
              {
                id: '1',
                slug: '1',
                text: nft.stage,
                color: 'nft-' + (nft.stage.toLowerCase())
              }
            ]}
          />
        </div>}
    </div>
  )
}

export { NftSiblingsAndStage }
