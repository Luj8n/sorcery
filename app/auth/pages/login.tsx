import { useRouter, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import { LoginForm } from "app/auth/components/LoginForm"

const LoginPage: BlitzPage = () => {
  const router = useRouter()

  return (
    <>
      <LoginForm
        onSuccess={() => {
          const next = router.query.next
            ? decodeURIComponent(router.query.next as string)
            : Routes.Home()
          router.push(next)
        }}
      />
    </>
  )
}

LoginPage.redirectAuthenticatedTo = Routes.Home()
LoginPage.getLayout = (page) => <Layout title="Log In">{page}</Layout>

export default LoginPage
