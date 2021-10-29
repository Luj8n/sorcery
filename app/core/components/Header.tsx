import { useState, useEffect } from "react"
import { Image, Link, Routes } from "blitz"
import { MdLightMode, MdDarkMode } from "react-icons/md"
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
  const { resolvedTheme } = useTheme()
  const currentUser = useCurrentUser()

  const buttons = [
    {
      text: "Problems",
      link: "/problems",
    },
    {
      text: "Leaderboard",
      link: "/leaderboard",
    },
    {
      text: "Create",
      link: "/create",
    },
    {
      text: "Playground",
      link: "/playground",
    },
  ].map((b) => (
    <button
      key={b.link}
      className={`px-1 focus:outline-none ${
        currentTab === b.link
          ? "border-b-2 pt-[2px] border-primary-500"
          : "border-transparent hover:border-b-2 hover:pt-[2px] hover:border-primary-300 hover:border-opacity-60"
      }`}
      onClick={() => setCurrentTab(b.link)}
    >
      {b.text}
    </button>
  ))

  return (
    <>
      <div className="bg-white dark:bg-neutral-900 h-20 px-5 flex align-middle w-screen justify-between">
        <div className="flex space-x-6">
          <Link href={Routes.Home()}>
            <Image src={logo} alt="sorcery" className="cursor-pointer" />
          </Link>
          {buttons}
        </div>
        <div className="flex space-x-6">
          <ThemeButton className="hover:text-neutral-900 text-neutral-600 dark:hover:text-neutral-50 dark:text-neutral-300" />
          {currentUser ? (
            <button className="my-auto">
              <FaUserCircle size={35} />
            </button>
          ) : (
            <Link href={Routes.LoginPage()}>
              <button className="h-1/2 my-auto px-5 rounded-md bg-primary-500 text-neutral-50 hover:ring-2 focus:ring-4">
                Log in
              </button>
            </Link>
          )}
        </div>
      </div>
    </>
  )
}

export default Header
