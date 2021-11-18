import { useState, useEffect } from "react"
import { BlitzPage, Routes, invoke } from "blitz"
import { MdSettings } from "react-icons/md"
import Header from "app/core/layouts/Layout"
import executeCode from "app/queries/executeCode"
import Select from "app/core/components/Select"

const PlaygroundPage: BlitzPage = () => {
  const [mounted, setMounted] = useState(false)
  const [code, setCode] = useState("")
  const [stdin, setStdin] = useState("")
  const [stdout, setStdout] = useState("")
  const [stderror, setStderror] = useState("")
  const [language, setLanguage] = useState("")
  const [settingsWindow, setSettingsWindow] = useState(false)
  const [codeIsExecuting, setCodeIsExecuting] = useState(false)

  // TODO: query to get the languages and set the default language

  useEffect(() => setMounted(true), [])

  if (!mounted) return null

  const changeCode = (newCode: string) => {
    localStorage.setItem("code", newCode)
    setCode(newCode)
  }

  const changeStdin = (newStdin: string) => {
    localStorage.setItem("stdin", newStdin)
    setStdin(newStdin)
  }

  const changeLanguage = (newLanguage: string) => {
    localStorage.setItem("language", newLanguage)
    setLanguage(newLanguage)
  }

  let savedCode = localStorage.getItem("code")
  let savedStdin = localStorage.getItem("stdin")
  let savedLanguage = localStorage.getItem("language")

  if (savedCode === null) {
    const defaultCode = "// write code here"
    savedCode = defaultCode
  }

  if (savedStdin === null) {
    const defaultStdin = ""
    savedStdin = defaultStdin
  }

  if (savedLanguage === null) {
    const defaultLanguage = "Ruby"
    savedLanguage = defaultLanguage
  }

  if (savedCode !== code) {
    changeCode(savedCode)
  }

  if (savedStdin !== stdin) {
    changeStdin(savedStdin)
  }

  if (savedLanguage !== language) {
    changeLanguage(savedLanguage)
  }

  return (
    <div className="h-full flex flex-row justify-between items-stretch">
      <div className="w-1/3 flex flex-col p-5">
        <div className="flex flex-row justify-between items-center">
          <Select
            info="Change language"
            items={["C#", "Javascript", "Ruby"]}
            defaultItem={language}
            onSelect={(option) => changeLanguage(option)}
          />
          <div>
            <MdSettings
              size={30}
              className="cursor-pointer"
              onClick={() => setSettingsWindow(!settingsWindow)}
            />
          </div>
        </div>
        <h1 className="text-lg font-semibold mb-3">Input:</h1>
        <textarea
          className="whitespace-pre h-28 mb-5 text-base bg-neutral-200 text-neutral-800 dark:bg-neutral-700 dark:text-neutral-100 p-3 resize-none outline-none"
          spellCheck={false}
          value={stdin}
          onChange={(e) => changeStdin(e.target.value)}
        />
        <button
          className="h-12 w-full mb-7 font-semibold text-lg rounded-md bg-primary-600 text-neutral-50 hover:bg-primary-700 active:ring-4 disabled:active:ring-0 disabled:bg-primary-500 disabled:cursor-default"
          disabled={codeIsExecuting}
          onClick={() => {
            setCodeIsExecuting(true)
            invoke(executeCode, { code, language, stdin }).then((r) => {
              setStdout(r.stdout)
              setStderror(r.stderr ?? (r.time_limit_exceeded ? "Time limit exceeded" : ""))
              setCodeIsExecuting(false)
              console.log(`Time taken to execute: ${r.time}`)
            })
          }}
        >
          Execute code
        </button>
        <h1 className="text-lg font-semibold mb-3">stdout:</h1>
        <div className="overflow-auto whitespace-pre mb-7 p-3 h-28 bg-neutral-300 text-neutral-900 dark:bg-neutral-600 dark:text-neutral-100">
          {stdout}
        </div>
        <h1 className="text-lg font-semibold mb-3">stderr:</h1>
        <div className="overflow-auto whitespace-pre p-3 h-28 bg-neutral-300 text-neutral-900 dark:bg-neutral-600 dark:text-neutral-100">
          {stderror}
        </div>
      </div>
      <textarea
        className="whitespace-pre text-base flex-grow bg-neutral-200 text-neutral-800 dark:bg-neutral-700 dark:text-neutral-100 p-5 resize-none outline-none"
        spellCheck={false}
        value={code}
        onChange={(e) => changeCode(e.target.value)}
      />
    </div>
  )
}

PlaygroundPage.authenticate = { redirectTo: Routes.LoginPage() }
PlaygroundPage.getLayout = (page) => <Header title="Playground">{page}</Header>

export default PlaygroundPage
