import { AuthenticationError, Link, useMutation, Routes } from "blitz"
import { LabeledTextField } from "app/core/components/LabeledTextField"
import { Form, FORM_ERROR } from "app/core/components/Form"
import login from "app/auth/mutations/login"
import { Login } from "app/auth/validations"

type LoginFormProps = {
  onSuccess?: () => void
}

export const LoginForm = (props: LoginFormProps) => {
  const [loginMutation] = useMutation(login)

  return (
    <div className="flex items-center justify-center flex-col h-5/6 sm:w-[33rem] w-4/5 mx-auto">
      <h1 className="w-full mb-10 text-4xl font-bold text-center">Login</h1>

      <Form
        submitText="Log in"
        schema={Login}
        initialValues={{ email: "", password: "" }}
        className="w-full rounded-lg shadow-md bg-neutral-50 dark:bg-neutral-700 sm:p-9 p-5"
        buttonProps={{
          className:
            "w-full rounded-md bg-primary-600 text-neutral-50 py-2.5 font-medium disabled:bg-primary-500 disabled:cursor-default hover:bg-primary-700 active:ring-4",
        }}
        alertProps={{ className: "text-red-600" }}
        onSubmit={async (values) => {
          try {
            await loginMutation(values)
            props.onSuccess?.()
          } catch (error: any) {
            if (error instanceof AuthenticationError) {
              return { [FORM_ERROR]: "Sorry, those credentials are invalid" }
            } else {
              return {
                [FORM_ERROR]:
                  "Sorry, we had an unexpected error. Please try again. - " + error.toString(),
              }
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
        <LabeledTextField
          name="password"
          label="Password"
          type="password"
          labelProps={{ className: "mb-1.5" }}
          className="appearance-none outline-none w-full text-base py-1.5 px-2 rounded-md border-2 border-opacity-50 border-neutral-400 focus:border-primary-500 border-solid dark:bg-neutral-600 dark:disabled:bg-neutral-500 bg-neutral-50 disabled:bg-neutral-200"
          alertProps={{ className: "text-red-600 text-sm mt-1" }}
        />
        <Link href={Routes.ForgotPasswordPage()}>
          <a className="text-primary-600 dark:text-primary-500 font-semibold hover:text-primary-500 dark:hover:text-primary-400">
            Forgot your password?
          </a>
        </Link>
      </Form>

      <div className="mt-4 text-primary-600 dark:text-primary-500 font-semibold hover:text-primary-500 dark:hover:text-primary-400 text-base">
        <Link href={Routes.SignupPage()}>Or Sign Up</Link>
      </div>
    </div>
  )
}

export default LoginForm
