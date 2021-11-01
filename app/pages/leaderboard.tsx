import { BlitzPage, Routes } from "blitz"
import Header from "app/core/layouts/Layout"

const LeaderboardPage: BlitzPage = () => {
  return (
    <>
      <div>Test</div>
    </>
  )
}

LeaderboardPage.authenticate = { redirectTo: Routes.LoginPage() }
LeaderboardPage.getLayout = (page) => <Header title="Test">{page}</Header>

export default LeaderboardPage
