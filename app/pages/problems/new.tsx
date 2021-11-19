import { Link, useRouter, useMutation, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import createProblem from "app/problems/mutations/createProblem"
import { ProblemForm, FORM_ERROR } from "app/problems/components/ProblemForm"

const NewProblemPage: BlitzPage = () => {
  const router = useRouter()
  const [createProblemMutation] = useMutation(createProblem)

  return (
    <div>
      <h1>Create New Problem</h1>

      <ProblemForm
        submitText="Create Problem"
        // TODO use a zod schema for form validation
        //  - Tip: extract mutation's schema into a shared `validations.ts` file and
        //         then import and use it here
        // schema={CreateProblem}
        // initialValues={{}}
        onSubmit={async (values) => {
          try {
            const problem = await createProblemMutation(values)
            router.push(Routes.ShowProblemPage({ problemId: problem.id }))
          } catch (error: any) {
            console.error(error)
            return {
              [FORM_ERROR]: error.toString(),
            }
          }
        }}
      />

      <p>
        <Link href={Routes.ProblemsPage()}>
          <a>Problems</a>
        </Link>
      </p>
    </div>
  )
}

NewProblemPage.authenticate = true
NewProblemPage.getLayout = (page) => <Layout title={"Create New Problem"}>{page}</Layout>

export default NewProblemPage
