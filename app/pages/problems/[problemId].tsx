import { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useParam, BlitzPage, useMutation, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getProblem from "app/problems/queries/getProblem"
import deleteProblem from "app/problems/mutations/deleteProblem"

export const Problem = () => {
  const router = useRouter()
  const problemId = useParam("problemId", "number")
  const [deleteProblemMutation] = useMutation(deleteProblem)
  const [problem] = useQuery(getProblem, { id: problemId })

  return (
    <>
      <Head>
        <title>Problem {problem.id}</title>
      </Head>

      <div>
        <h1>Problem {problem.id}</h1>
        <pre>{JSON.stringify(problem, null, 2)}</pre>

        <Link href={Routes.EditProblemPage({ problemId: problem.id })}>
          <a>Edit</a>
        </Link>

        <button
          type="button"
          onClick={async () => {
            if (window.confirm("This will be deleted")) {
              await deleteProblemMutation({ id: problem.id })
              router.push(Routes.ProblemsPage())
            }
          }}
          style={{ marginLeft: "0.5rem" }}
        >
          Delete
        </button>
      </div>
    </>
  )
}

const ShowProblemPage: BlitzPage = () => {
  return (
    <div>
      <p>
        <Link href={Routes.ProblemsPage()}>
          <a>Problems</a>
        </Link>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <Problem />
      </Suspense>
    </div>
  )
}

ShowProblemPage.authenticate = true
ShowProblemPage.getLayout = (page) => <Layout>{page}</Layout>

export default ShowProblemPage
