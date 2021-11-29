import { Suspense, useEffect } from "react"
import {
  Head,
  Link,
  useRouter,
  useQuery,
  useMutation,
  useParam,
  BlitzPage,
  Routes,
  useSession,
} from "blitz"
import Layout from "app/core/layouts/Layout"
import getProblem from "app/problems/queries/getProblem"
import updateProblem from "app/problems/mutations/updateProblem"
import { ProblemForm, FORM_ERROR } from "app/problems/components/ProblemForm"

export const EditProblem = () => {
  const router = useRouter()
  const session = useSession()
  const problemId = useParam("problemId", "number")
  const [problem, { setQueryData }] = useQuery(
    getProblem,
    { id: problemId },
    {
      // This ensures the query never refreshes and overwrites the form data while the user is editing.
      staleTime: Infinity,
    }
  )
  const [updateProblemMutation] = useMutation(updateProblem)

  useEffect(() => {
    if (session.userId !== problem.userId && session.role !== "ADMIN") {
      router.push(Routes.Home())
    }
  })

  return (
    <>
      <Head>
        <title>Edit Problem {problem.id}</title>
      </Head>

      <div>
        <h1>Edit Problem {problem.id}</h1>
        <pre>{JSON.stringify(problem, null, 2)}</pre>

        <ProblemForm
          submitText="Update Problem"
          // TODO use a zod schema for form validation
          //  - Tip: extract mutation's schema into a shared `validations.ts` file and
          //         then import and use it here
          // schema={UpdateProblem}
          initialValues={problem}
          onSubmit={async (values) => {
            try {
              const updated = await updateProblemMutation({
                id: problem.id,
                ...values,
              })
              await setQueryData(updated)
              router.push(Routes.ShowProblemPage({ problemId: updated.id }))
            } catch (error: any) {
              console.error(error)
              return {
                [FORM_ERROR]: error.toString(),
              }
            }
          }}
        />
      </div>
    </>
  )
}

const EditProblemPage: BlitzPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditProblem />
      </Suspense>

      <p>
        <Link href={Routes.ProblemsPage()}>
          <a>Problems</a>
        </Link>
      </p>
    </div>
  )
}

EditProblemPage.authenticate = true
EditProblemPage.getLayout = (page) => <Layout>{page}</Layout>

export default EditProblemPage
