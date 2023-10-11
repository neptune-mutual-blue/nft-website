/**
 *
 * @param {Object} props
 * @param {string | Element} props.label
 * @param {boolean} props.checked
 * @param {(checked?: boolean) => any} props.onChange
 * @returns
 */

const Radio = ({ label, checked, onChange, ...rest }) => {
  return (
    <label className='custom checkbox container' aria-disabled={rest.disabled ? 'true' : 'false'}>
      <input
        type='radio'
        className={checked ? 'checked' : undefined}
        onChange={e => {
          onChange(e.target.checked)
        }}
        checked={checked}
        {...rest}
      />
      {label}
    </label>
  )
}

export { Radio }
