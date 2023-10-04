/**
 *
 * @param {Object} props
 * @param {string | Element} props.label
 * @param {boolean} props.checked
 * @param {(checked?: boolean) => any} props.onChange
 * @returns
 */

const Radio = ({ label, checked, onChange }) => {

  return (
    <label className='custom checkbox container'>
      <input
        type='radio'
        className={checked ? 'checked' : undefined}
        onChange={e => {
          onChange(e.target.checked)
        }}
        checked={checked}
      />
      {label}
    </label>
  )
}

export { Radio }
