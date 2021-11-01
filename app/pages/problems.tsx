import { BlitzPage, Routes } from "blitz"
import Header from "app/core/layouts/Layout"

const ProblemsPage: BlitzPage = () => {
  return (
    <>
      <div>Test</div>
    </>
  )
}

ProblemsPage.authenticate = { redirectTo: Routes.LoginPage() }
ProblemsPage.getLayout = (page) => <Header title="Test">{page}</Header>

export default ProblemsPage
