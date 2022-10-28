import { ErrorMessage, Field } from "formik"
import { FormGroupProps } from "../../ts/interfaces"

export default function FormGroupInput({
  type,
  label,
  placeholder,
  minLength,
  maxLength
}: FormGroupProps) {
  return (
    <div className="form-group">
      <label className="form__label" htmlFor={type}>
        {label}
      </label>
      <Field
        className="form__input"
        type={type}
        name={type}
        id={type}
        placeholder={placeholder}
        minLength={minLength}
        maxLength={maxLength}
      />
      <ErrorMessage name={type} />
    </div>
  )
}
