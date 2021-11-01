import { BlitzPage, Routes } from "blitz"
import Header from "app/core/layouts/Layout"

const CreatePage: BlitzPage = () => {
  return (
    <>
      <div>Test</div>
    </>
  )
}

CreatePage.authenticate = { redirectTo: Routes.LoginPage() }
CreatePage.getLayout = (page) => <Header title="Test">{page}</Header>

export default CreatePage
