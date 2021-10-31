import { ReactNode, Suspense } from "react"
import { Head } from "blitz"
import Header from "../components/Header"

type LayoutProps = {
  title?: string
  children: ReactNode
}

const WithHeaderLayout = ({ title, children }: LayoutProps) => {
  return (
    <>
      <Head>
        <title>{title || "Sorcery"}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="h-screen bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-100 font-primary">
        <Suspense fallback="">
          <Header />
        </Suspense>
        {children}
      </div>
    </>
  )
}

export default WithHeaderLayout
