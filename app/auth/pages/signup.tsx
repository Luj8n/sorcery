import { useRouter, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import { SignupForm } from "app/auth/components/SignupForm"

const SignupPage: BlitzPage = () => {
  const router = useRouter()

  return (
    <>
      <SignupForm onSuccess={() => router.push(Routes.Home())} />
    </>
  )
}

SignupPage.redirectAuthenticatedTo = Routes.Home()
SignupPage.getLayout = (page) => <Layout title="Sign Up">{page}</Layout>

export default SignupPage
