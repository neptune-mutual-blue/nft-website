
const Progress = ({ percent }) => {
  return (
    <div className='progress bar'>
      <div className='value' style={{ width: percent + '%' }} />
    </div>
  )
}

export { Progress }
