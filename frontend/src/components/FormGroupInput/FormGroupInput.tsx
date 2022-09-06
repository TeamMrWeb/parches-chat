interface FormGroup {
  type: string
  label: string
  placeholder: string
  minLength?: number
  maxLength?: number
  required: boolean
}

export default function FormGroupInput({ type, label, placeholder, minLength, maxLength, required }: FormGroup) {
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
