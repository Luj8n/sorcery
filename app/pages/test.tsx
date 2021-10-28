import { BlitzPage } from "blitz"
import WithHeader from "app/core/layouts/Layout"

const Test: BlitzPage = () => {
  return (
    <>
      <div>Test</div>
    </>
  )
}

Test.getLayout = (page) => <WithHeader title="Test">{page}</WithHeader>

export default Test
