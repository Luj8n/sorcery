import { Suspense, useState, useEffect } from "react"
import { Image, Link, BlitzPage, useMutation, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import logout from "app/auth/mutations/logout"
import { BsChevronDown } from "react-icons/bs"
import { MdLightMode, MdDarkMode } from "react-icons/md"
import { useTheme } from "next-themes"
import logo from "public/logo.png"

const UserInfo = () => {
  const currentUser = useCurrentUser()
  const [logoutMutation] = useMutation(logout)

  if (currentUser) {
    return (
      <>
        <button
          className=""
          onClick={async () => {
            await logoutMutation()
          }}
        >
          Logout
        </button>
        <div>
          User id: <code>{currentUser.id}</code>
          <br />
          User role: <code>{currentUser.role}</code>
        </div>
      </>
    )
  } else {
    return (
      <>
        <Link href={Routes.SignupPage()}>
          <a className="">
            <strong>Sign Up</strong>
          </a>
        </Link>
        <Link href={Routes.LoginPage()}>
          <a className="">
            <strong>Login</strong>
          </a>
        </Link>
      </>
    )
  }
}

const ThemeButton = () => {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()
  const isDarkMode = theme === "dark"

  useEffect(() => setMounted(true), [])

  if (!mounted) return null

  return (
    <div>
      <button
        onClick={() => setTheme(isDarkMode ? "light" : "dark")}
        className="focus:outline-none"
      >
        {isDarkMode ? <MdDarkMode size={30} /> : <MdLightMode size={30} />}
      </button>
    </div>
  )
}

const Home: BlitzPage = () => {
  return (
    <>
      <div className="dark:bg-primary-900 dark:text-neutral-100 h-20">
        <div>Text</div>
        <ThemeButton />
      </div>

      <Suspense fallback="AAAAAAAAAAAAAAAAAAAAAAA">
        <UserInfo />
      </Suspense>
    </>
  )
}

Home.suppressFirstRenderFlicker = true
Home.getLayout = (page) => <Layout title="Home">{page}</Layout>

export default Home
