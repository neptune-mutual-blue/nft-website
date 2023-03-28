
const NftCardWithBlurEffect = (props) => {
  const { nft, className } = props

  return (
    <div className={'blur effect character details' + (className ? ' ' + className : '')}>
      <div>
        <img src={nft.thumbnail} alt={nft.name} />
      </div>
      <div className='overlay'>
        <div>
          <div>{nft.name}</div>
          <div className='supporting text'>
            {nft.siblings} siblings
          </div>
        </div>
      </div>
    </div>
  )
}

export default NftCardWithBlurEffect
