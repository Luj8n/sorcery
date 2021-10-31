import { ReactNode, PropsWithoutRef } from "react"
import { Form as FinalForm, FormProps as FinalFormProps } from "react-final-form"
import { z } from "zod"
import { validateZodSchema } from "blitz"
export { FORM_ERROR } from "final-form"

export interface FormProps<S extends z.ZodType<any, any>>
  extends Omit<PropsWithoutRef<JSX.IntrinsicElements["form"]>, "onSubmit"> {
  /** All your form fields */
  children?: ReactNode
  /** Text to display in the submit button */
  submitText?: string
  schema?: S
  onSubmit: FinalFormProps<z.infer<S>>["onSubmit"]
  initialValues?: FinalFormProps<z.infer<S>>["initialValues"]
  alertProps?: PropsWithoutRef<JSX.IntrinsicElements["div"]>
  buttonProps?: PropsWithoutRef<JSX.IntrinsicElements["button"]>
}

export function Form<S extends z.ZodType<any, any>>({
  children,
  submitText,
  schema,
  initialValues,
  onSubmit,
  alertProps,
  buttonProps,
  ...props
}: FormProps<S>) {
  return (
    <FinalForm
      initialValues={initialValues}
      validate={validateZodSchema(schema)}
      onSubmit={onSubmit}
      render={({ handleSubmit, submitting, submitError }) => (
        <form onSubmit={handleSubmit} {...props}>
          {children}

          <div
            role="alert"
            style={{ visibility: submitError ? "visible" : "hidden" }}
            {...alertProps}
          >
            {submitError + ""}
          </div>

          {submitText && (
            <button type="submit" disabled={submitting} {...buttonProps}>
              {submitText}
            </button>
          )}
        </form>
      )}
    />
  )
}

export default Form
