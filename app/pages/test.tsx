import { BlitzPage } from "blitz"
import Header from "app/core/layouts/Layout"

const Test: BlitzPage = () => {
  return (
    <>
      <div>Test</div>
    </>
  )
}

Test.getLayout = (page) => <Header title="Test">{page}</Header>

export default Test
