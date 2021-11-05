import { BlitzPage, useRouterQuery, Link, useMutation, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import { LabeledTextField } from "app/core/components/LabeledTextField"
import { Form, FORM_ERROR } from "app/core/components/Form"
import { ResetPassword } from "app/auth/validations"
import resetPassword from "app/auth/mutations/resetPassword"

const ResetPasswordPage: BlitzPage = () => {
  const query = useRouterQuery()
  const [resetPasswordMutation, { isSuccess }] = useMutation(resetPassword)

  if (isSuccess)
    return (
      <div className="flex items-center justify-center flex-col h-5/6 sm:w-[33rem] w-4/5 mx-auto">
        <h1 className="mb-10 text-4xl font-bold text-center">Password Reset Successfully</h1>
        <p className="text-base text-center text-primary-500 font-semibold hover:text-primary-400">
          <Link href={Routes.Home()}>Go to the homepage</Link>
        </p>
      </div>
    )

  return (
    <div className="flex items-center justify-center flex-col h-5/6 w-[28rem] mx-auto">
      <h1 className="w-full mb-10 text-4xl font-bold text-center">Set a New Password</h1>

      <Form
        submitText="Reset Password"
        schema={ResetPassword}
        initialValues={{ password: "", passwordConfirmation: "", token: query.token as string }}
        className="w-full rounded-lg shadow-md bg-neutral-50 dark:bg-neutral-700 sm:p-9 p-5"
        buttonProps={{
          className:
            "w-full rounded-md bg-primary-600 text-neutral-50 py-2.5 font-medium disabled:bg-primary-500 disabled:cursor-default hover:bg-primary-700 active:ring-4",
        }}
        alertProps={{ className: "text-red-600" }}
        onSubmit={async (values) => {
          try {
            await resetPasswordMutation(values)
          } catch (error: any) {
            if (error.name === "ResetPasswordError") {
              return {
                [FORM_ERROR]: error.message,
              }
            } else {
              return {
                [FORM_ERROR]: "Sorry, we had an unexpected error. Please try again.",
              }
            }
          }
        }}
      >
        <LabeledTextField
          name="password"
          label="New Password"
          type="password"
          className="appearance-none outline-none w-full text-base py-1.5 px-2 rounded-md border-2 border-opacity-50 border-neutral-400 focus:border-primary-500 border-solid dark:bg-neutral-600 dark:disabled:bg-neutral-500 bg-neutral-50 disabled:bg-neutral-200"
          labelProps={{ className: "mb-1.5" }}
          alertProps={{ className: "text-red-600 text-sm mt-1" }}
          outerProps={{ className: "mb-3" }}
        />
        <LabeledTextField
          name="passwordConfirmation"
          label="Confirm New Password"
          type="password"
          className="appearance-none outline-none w-full text-base py-1.5 px-2 rounded-md border-2 border-opacity-50 border-neutral-400 focus:border-primary-500 border-solid dark:bg-neutral-600 dark:disabled:bg-neutral-500 bg-neutral-50 disabled:bg-neutral-200"
          labelProps={{ className: "mb-1.5" }}
          alertProps={{ className: "text-red-600 text-sm mt-1" }}
          outerProps={{ className: "mb-3" }}
        />
      </Form>
    </div>
  )
}

ResetPasswordPage.getLayout = (page) => <Layout title="Reset Your Password">{page}</Layout>

export default ResetPasswordPage
