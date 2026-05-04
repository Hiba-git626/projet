export function Put({ placeholder, onChange }) {
  return (
    <input
      type="password"
      className="form-control mb-2"
      placeholder={placeholder}
      onChange={(e) => onChange && onChange(e.target.value)}
    />
  )
}
