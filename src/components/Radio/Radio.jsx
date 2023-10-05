/**
 *
 * @param {Object} props
 * @param {string | Element} props.label
 * @param {"xs" | "sm" | "md" | "lg" | "xl" | "2xl" } [props.size]
 * @param {boolean} props.checked
 * @param {(checked?: boolean) => any} props.onChange
 * @returns
 */

const Radio = ({ label, checked, onChange }) => {
  return (
    <label className='custom radio container'>
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
