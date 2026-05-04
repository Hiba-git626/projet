export function Input({ placeholder, onChange, type = "text" }) {
  return (
    <input
      type={type}
      className="form-control mb-2"
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
    />
  )
}
