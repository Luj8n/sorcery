import { Suspense, useState, useEffect } from "react"
import { Image, Link, BlitzPage, useMutation, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import logout from "app/auth/mutations/logout"
import { BsChevronDown } from "react-icons/bs"
import { MdLightMode, MdDarkMode } from "react-icons/md"
import { useTheme } from "next-themes"
import logo from "public/white-logo.svg"

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

const ThemeButton = ({ ...props }) => {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()
  const isDarkMode = theme === "dark"

  useEffect(() => setMounted(true), [])

  if (!mounted) return null

  return (
    <button onClick={() => setTheme(isDarkMode ? "light" : "dark")} {...props}>
      {isDarkMode ? <MdDarkMode size={30} /> : <MdLightMode size={30} />}
    </button>
  )
}

const Header = () => {
  return (
    <>
      <div className="bg-white dark:bg-neutral-900 h-20 px-5 flex align-middle w-screen justify-between">
        <div className="flex space-x-6">
          <Image src={logo} alt="sorcery" />
          <button className="mr-2 my-auto border-solid">Problems</button>
          <button className="mr-2 my-auto">Leaderboard</button>
          <button className="mr-2 my-auto">Create</button>
          <button className="mr-2 my-auto">Playground</button>
        </div>
        <ThemeButton className="focus:outline-none my-auto hover:text-neutral-900 text-neutral-600 dark:hover:text-neutral-50 dark:text-neutral-300" />
      </div>
    </>
  )
}

const Home: BlitzPage = () => {
  return (
    <>
      <Header />

      <Suspense fallback="AAAAAAAAAAAAAAAAAAAAAAA">
        <UserInfo />
      </Suspense>
    </>
  )
}

Home.suppressFirstRenderFlicker = true
Home.getLayout = (page) => <Layout title="Home">{page}</Layout>

export default Home
