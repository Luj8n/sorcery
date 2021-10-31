import { forwardRef, ComponentPropsWithoutRef, PropsWithoutRef } from "react"
import { useField, UseFieldConfig } from "react-final-form"

export interface LabeledTextFieldProps extends PropsWithoutRef<JSX.IntrinsicElements["input"]> {
  /** Field name. */
  name: string
  /** Field label. */
  label?: string
  /** Field type. Doesn't include radio buttons and checkboxes */
  type?: "text" | "password" | "email" | "number"
  outerProps?: PropsWithoutRef<JSX.IntrinsicElements["div"]>
  labelProps?: ComponentPropsWithoutRef<"div">
  fieldProps?: UseFieldConfig<string>
  alertProps?: PropsWithoutRef<JSX.IntrinsicElements["div"]>
}

export const LabeledTextField = forwardRef<HTMLInputElement, LabeledTextFieldProps>(
  ({ name, label, outerProps, fieldProps, labelProps, alertProps, ...props }, ref) => {
    const {
      input,
      meta: { touched, error, submitError, submitting },
    } = useField(name, {
      parse:
        props.type === "number"
          ? (Number as any)
          : // Converting `""` to `null` ensures empty values will be set to null in the DB
            (v) => (v === "" ? null : v),
      ...fieldProps,
    })

    const normalizedError = Array.isArray(error) ? error.join(", ") : error || submitError

    const inputElement = <input {...input} disabled={submitting} {...props} ref={ref} />

    return (
      <div {...outerProps}>
        {label ? (
          <label>
            <div {...labelProps}>{label}</div>
            {inputElement}
          </label>
        ) : (
          inputElement
        )}

        {console.log(error)}

        <div
          role="alert"
          {...alertProps}
          style={{ visibility: touched && normalizedError ? "visible" : "hidden" }}
        >
          {normalizedError + ""}
        </div>
      </div>
    )
  }
)

export default LabeledTextField
