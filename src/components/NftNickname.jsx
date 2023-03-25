
const NftNickname = ({ nft }) => {
  return (
    <div className='formatted nickname' data-color={'level' + nft.level}>
      {nft.nickname}
    </div>
  )
}

export { NftNickname }
