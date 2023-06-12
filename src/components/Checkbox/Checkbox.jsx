/**
 *
 * @param {Object} props
 * @param {string | Element} props.label
 * @param {"xs" | "sm" | "md" | "lg" | "xl" | "2xl" } [props.size]
 * @param {boolean} props.checked
 * @param {(checked?: boolean) => any} props.onChange
 * @returns
 */

// TODO: Remove ESLINT DISABLE WHEN REVERTING BACK TO CHECKBOX
// eslint-disable-next-line
const Checkbox = ({ label, size = 'md', checked, onChange }) => {
  // TODO: Change The Input Type to Checkbox, and remove the className property

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
      {/* <span className='checkmark' data-size={size} /> */}
      {label}
    </label>
  )
}

export { Checkbox }
