import { BlitzPage, useMutation, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import { LabeledTextField } from "app/core/components/LabeledTextField"
import { Form, FORM_ERROR } from "app/core/components/Form"
import { ForgotPassword } from "app/auth/validations"
import forgotPassword from "app/auth/mutations/forgotPassword"

const ForgotPasswordPage: BlitzPage = () => {
  const [forgotPasswordMutation, { isSuccess }] = useMutation(forgotPassword)

  if (isSuccess)
    return (
      <div className="flex items-center justify-center flex-col h-5/6 w-auto mx-auto">
        <h1 className="mb-10 text-4xl font-bold text-center">Request Submitted</h1>
        <p className="text-base text-center">
          If your email is in our system, you will receive instructions to reset your password
          shortly.
        </p>
      </div>
    )
  else
    return (
      <div className="flex items-center justify-center flex-col h-5/6 w-[28rem] mx-auto">
        <h1 className="w-full mb-10 text-4xl font-bold text-center">Forgot your password?</h1>
        <Form
          submitText="Send Reset Password Instructions"
          schema={ForgotPassword}
          initialValues={{ email: "" }}
          className="w-full rounded-lg shadow-md bg-neutral-50 dark:bg-neutral-700 p-9"
          buttonProps={{
            className:
              "w-full rounded-md bg-primary-600 text-neutral-50 py-2.5 font-medium disabled:bg-primary-500 disabled:cursor-default hover:bg-primary-700 active:ring-4",
          }}
          alertProps={{ className: "text-red-600" }}
          onSubmit={async (values) => {
            try {
              await forgotPasswordMutation(values)
            } catch (error: any) {
              return {
                [FORM_ERROR]: "Sorry, we had an unexpected error. Please try again.",
              }
            }
          }}
        >
          <LabeledTextField
            name="email"
            label="Email address"
            labelProps={{ className: "mb-1.5" }}
            className="appearance-none outline-none w-full text-base py-1.5 px-2 rounded-md border-2 border-opacity-50 border-neutral-400 focus:border-primary-500 border-solid dark:bg-neutral-600 dark:disabled:bg-neutral-500 bg-neutral-50 disabled:bg-neutral-200"
            alertProps={{ className: "text-red-600 text-sm mt-1" }}
            outerProps={{ className: "mb-3" }}
          />
        </Form>
      </div>
    )
}

ForgotPasswordPage.redirectAuthenticatedTo = Routes.Home()
ForgotPasswordPage.getLayout = (page) => <Layout title="Forgot Your Password?">{page}</Layout>

export default ForgotPasswordPage
