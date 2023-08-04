/**
 *
 * @param {Object} props
 * @param {string | Element} props.label
 * @param {"xs" | "sm" | "md" | "lg" | "xl" | "2xl" } [props.size]
 * @param {boolean} props.checked
 * @param {(checked?: boolean) => any} props.onChange
 * @returns
 */

const CheckboxWithMinus = ({ label, size = 'md', checked, onChange }) => {
  return (
    <label className='minus checkbox container'>
      <input
        type='checkbox'
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

export { CheckboxWithMinus }
