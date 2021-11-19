import { Suspense } from "react"
import { Head, Link, usePaginatedQuery, useRouter, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getProblems from "app/problems/queries/getProblems"

const ITEMS_PER_PAGE = 100

export const ProblemsList = () => {
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const [{ problems, hasMore }] = usePaginatedQuery(getProblems, {
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })

  const goToPreviousPage = () => router.push({ query: { page: page - 1 } })
  const goToNextPage = () => router.push({ query: { page: page + 1 } })

  return (
    <div>
      <ul>
        {problems.map((problem) => (
          <li key={problem.id}>
            <Link href={Routes.ShowProblemPage({ problemId: problem.id })}>
              <a>{problem.title}</a>
            </Link>
          </li>
        ))}
      </ul>

      <button disabled={page === 0} onClick={goToPreviousPage}>
        Previous
      </button>
      <button disabled={!hasMore} onClick={goToNextPage}>
        Next
      </button>
    </div>
  )
}

const ProblemsPage: BlitzPage = () => {
  return (
    <>
      <Head>
        <title>Problems</title>
      </Head>

      <div>
        <p>
          <Link href={Routes.NewProblemPage()}>
            <a>Create Problem</a>
          </Link>
        </p>

        <Suspense fallback={<div>Loading...</div>}>
          <ProblemsList />
        </Suspense>
      </div>
    </>
  )
}

ProblemsPage.authenticate = { redirectTo: Routes.LoginPage() }
ProblemsPage.getLayout = (page) => <Layout title="Problems">{page}</Layout>

export default ProblemsPage
