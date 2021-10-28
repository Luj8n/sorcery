import { ReactNode } from "react"
import { Head } from "blitz"

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
      <div className="h-screen bg-neutral-200 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-100">
        {children}
      </div>
    </>
  )
}

export default Layout
