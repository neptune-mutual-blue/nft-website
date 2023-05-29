const Switch = ({ label, value, onChange }) => {
  return (
    <label className='switch component label'>
      <input
        type='checkbox' checked={value} onChange={(e) => {
          onChange(e.target.checked)
        }}
      />
      <div className='switch' />
      <span>{label}</span>

    </label>
  )
}

export default Switch
