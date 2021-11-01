import { ReactNode, Suspense } from "react"
import { Head } from "blitz"
import Header from "../components/Header"

type LayoutProps = {
  title?: string
  children: ReactNode
}

const Layout = ({ title, children }: LayoutProps) => {
  return (
    <>
      <Head>
        <title>{title || "Sorcery"}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="w-screen overflow-x-hidden h-screen bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-100 font-primary pt-20">
        <Suspense fallback="">
          <Header />
        </Suspense>
        {children}
      </div>
    </>
  )
}

export default Layout
