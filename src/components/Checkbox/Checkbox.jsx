/**
 *
 * @param {Object} props
 * @param {string | Element} props.label
 * @param {"xs" | "sm" | "md" | "lg" | "xl" | "2xl" } [props.size]
 * @param {boolean} props.checked
 * @param {(checked?: boolean) => any} props.onChange
 * @returns
 */

const Checkbox = ({ label, size = 'md', checked, onChange }) => {
  return (
    <label className='custom checkbox container'>
      <input
        type='checkbox'
        className={checked ? 'checked' : undefined}
        onChange={e => {
          onChange(e.target.checked)
        }}
        checked={checked}
      />
      <span className='checkmark' data-size={size} />
      {label}
    </label>
  )
}

export { Checkbox }
