import { useState, useEffect } from "react"
import { Image, Link, Routes, useRouter } from "blitz"
import { MdLightMode, MdDarkMode, MdMenu } from "react-icons/md"
import { FaUserCircle } from "react-icons/fa"
import { useTheme } from "next-themes"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import logo from "public/white-logo.svg"

const ThemeButton = ({ ...props }) => {
  const [mounted, setMounted] = useState(false)
  const { resolvedTheme, setTheme } = useTheme()
  const isDarkMode = resolvedTheme === "dark"

  useEffect(() => setMounted(true), [])

  if (!mounted) return null

  return (
    <button onClick={() => setTheme(isDarkMode ? "light" : "dark")} {...props}>
      {isDarkMode ? <MdDarkMode size={30} /> : <MdLightMode size={30} />}
    </button>
  )
}

const Header = () => {
  const [currentTab, setCurrentTab] = useState("/problems")
  const [hamburger, setHamburger] = useState(false)
  const router = useRouter()

  const { resolvedTheme } = useTheme()
  const currentUser = useCurrentUser()

  const buttons = [
    {
      text: "Problems",
      link: Routes.ProblemsPage(),
    },
    {
      text: "Leaderboard",
      link: Routes.LeaderboardPage(),
    },
    {
      text: "Create",
      link: Routes.CreatePage(),
    },
    {
      text: "Playground",
      link: Routes.PlaygroundPage(),
    },
  ]

  return (
    <>
      <div className="bg-white dark:bg-neutral-900 h-20 px-5 flex align-middle w-full justify-between fixed top-0 z-30">
        <Link href={Routes.Home()}>
          <Image src={logo} alt="sorcery" className="cursor-pointer" />
        </Link>
        <div className="md:flex space-x-3 lg:space-x-6 hidden">
          {buttons.map((btn) => (
            <button
              key={btn.link.pathname}
              className={`px-1 focus:outline-none font-semibold ${
                router.pathname === btn.link.pathname
                  ? "border-b-2 pt-[2px] border-primary-500"
                  : "border-transparent hover:border-b-2 hover:pt-[2px] hover:border-primary-300 hover:border-opacity-60"
              }`}
              onClick={() => router.push(btn.link)}
            >
              {btn.text}
            </button>
          ))}
        </div>
        <div className="flex space-x-6 flex-row items-center">
          <ThemeButton className="hover:text-neutral-900 text-neutral-600 dark:hover:text-neutral-50 dark:text-neutral-300" />
          {currentUser ? (
            <button>
              <FaUserCircle size={35} />
            </button>
          ) : (
            <Link href={Routes.LoginPage()}>
              <button className="hidden md:block h-1/2 px-5 rounded-md bg-primary-600 text-neutral-50 hover:bg-primary-700 active:ring-4 active:ring-primary-800">
                Log in
              </button>
            </Link>
          )}
          <MdMenu
            size={30}
            className="cursor-pointer md:hidden block"
            onClick={() => setHamburger(!hamburger)}
          />
        </div>
      </div>
      <div
        className={
          hamburger
            ? "md:hidden fixed top-20 w-screen flex flex-col bg-neutral-200 dark:bg-neutral-700 space-y-4 py-4"
            : "hidden"
        }
      >
        {[...buttons, { text: "Login", link: Routes.LoginPage() }].map((btn) => (
          <button
            key={btn.link.pathname}
            className={`focus:outline-none ${
              router.pathname === btn.link.pathname ? "font-semibold" : "font-normal"
            }`}
            onClick={() => router.push(btn.link)}
          >
            {btn.text}
          </button>
        ))}
      </div>
    </>
  )
}

export default Header
