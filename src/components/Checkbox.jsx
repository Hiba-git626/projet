export function Checkbox({ onChange }) {
  return (
    <div className="form-check mb-3">
      <input
        className="form-check-input"
        type="checkbox"
        id="rememberMe"
        onChange={onChange}
      />
      <label className="form-check-label" htmlFor="rememberMe">
        Se souvenir de moi
      </label>
    </div>
  )
}
