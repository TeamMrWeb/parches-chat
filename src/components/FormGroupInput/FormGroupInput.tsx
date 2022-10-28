import { FormGroupProps } from "../../ts/interfaces"

export default function FormGroupInput({
  type,
  label,
  placeholder,
  minLength,
  maxLength,
  required
}: FormGroupProps) {
  return (
    <div className="form-group">
      <label className="form__label" htmlFor={type}>
        {label}
      </label>
      <input
        className="form__input"
        type={type}
        name={type}
        id={type}
        placeholder={placeholder}
        required={required}
        minLength={minLength}
        maxLength={maxLength}
      />
    </div>
  )
}
