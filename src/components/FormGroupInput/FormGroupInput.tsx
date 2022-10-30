import { ErrorMessage, Field } from "formik"
import { FormGroupProps } from "../../ts/interfaces"
import { useState } from "react"
import eyeIcon from "../../assets/icons/eye-icon.svg"
import closedEyeIcon from "../../assets/icons/closed-eye-icon.svg"

export default function FormGroupInput({
  type,
  label,
  placeholder,
  minLength,
  maxLength
}: FormGroupProps) {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="form-group">
      <label className="form__label" htmlFor={type}>
        {label}
      </label>
      <div className="input-wrapper">
        <Field
          className="form__input"
          type={type === "password" ? (showPassword ? "text" : type) : type}
          name={type}
          id={type}
          placeholder={placeholder}
          minLength={minLength}
          maxLength={maxLength}
        ></Field>
        {type === "password" &&
          (showPassword ? (
            <img
              className="form__eye-icon"
              src={closedEyeIcon}
              alt="Ver contraseña"
              onClick={() => setShowPassword(!showPassword)}
            />
          ) : (
            <img
              className="form__eye-icon"
              src={eyeIcon}
              alt="Ocultar contraseña"
              onClick={() => setShowPassword(!showPassword)}
            />
          ))}
      </div>
      <ErrorMessage name={type} />
    </div>
  )
}
