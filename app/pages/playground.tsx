import { useState, useEffect, Suspense } from "react"
import { BlitzPage, Routes, invoke, useQuery } from "blitz"
import { MdSettings } from "react-icons/md"
import Header from "app/core/layouts/Layout"
import executeCode from "app/queries/executeCode"
import Select from "app/core/components/Select"
import { useSavedState } from "app/core/hooks/useSavedState"
import getRuntimes from "app/queries/getRuntimes"

interface LanguageSeletProps {
  defaultLanguage: string
  onLanguageSelect: (option: string) => void
}

const LanguageSelect = ({ defaultLanguage, onLanguageSelect }: LanguageSeletProps) => {
  const [runtimes] = useQuery(getRuntimes, null)

  const languages = runtimes
    .map((runtime) => runtime.language.slice(0, 1).toUpperCase() + runtime.language.slice(1))
    .filter((v, i, a) => a.indexOf(v) === i)

  languages.sort()

  return (
    <Select
      info="Change language"
      items={languages}
      defaultItem={defaultLanguage}
      onSelect={onLanguageSelect}
    />
  )
}

const PlaygroundPage: BlitzPage = () => {
  const [code, setCode] = useSavedState<string>("// write code here", "code")
  const [input, setInput] = useSavedState<string>("", "input")
  const [language, setLanguage] = useSavedState<string>("Javascript", "language")

  const [stdout, setStdout] = useState("")
  const [stderror, setStderror] = useState("")
  const [executionTime, setExecutionTime] = useState("")

  const [settingsWindow, setSettingsWindow] = useState(false)
  const [codeIsExecuting, setCodeIsExecuting] = useState(false)

  return (
    <div className="h-full flex flex-row justify-between items-stretch">
      <div className="w-1/3 flex flex-col p-5">
        <div className="flex flex-row justify-between items-center">
          <Suspense fallback="Loading...">
            <LanguageSelect defaultLanguage={language} onLanguageSelect={setLanguage} />
          </Suspense>
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
          className="font-firaMono whitespace-pre h-28 mb-5 text-base bg-neutral-200 text-neutral-800 dark:bg-neutral-700 dark:text-neutral-100 p-3 resize-none outline-none"
          spellCheck={false}
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          className="h-12 w-full mb-7 font-semibold text-lg rounded-md bg-primary-600 text-neutral-50 hover:bg-primary-700 active:ring-4 disabled:active:ring-0 disabled:bg-primary-500 disabled:cursor-default"
          disabled={codeIsExecuting}
          onClick={() => {
            setCodeIsExecuting(true)
            setStdout("")
            setStderror("")
            setExecutionTime("")
            invoke(executeCode, { code, language: language.toLowerCase(), input })
              .then((r) => {
                setStdout(r.stdout)
                setStderror(r.stderr ?? (r.timeLimitExceeded ? "Time limit exceeded" : ""))
                setExecutionTime(`${r.time} ms`)
                setCodeIsExecuting(false)
              })
              .catch((e) => {
                setCodeIsExecuting(false)
                console.error(e)
              })
          }}
        >
          Execute code
        </button>
        <h1 className="text-lg font-semibold mb-3">stdout:</h1>
        <div className="font-firaMono overflow-auto whitespace-pre mb-7 p-3 h-28 bg-neutral-300 text-neutral-900 dark:bg-neutral-600 dark:text-neutral-100">
          {stdout}
        </div>
        <h1 className="text-lg font-semibold mb-3">stderr:</h1>
        <div className="font-firaMono overflow-auto whitespace-pre mb-7 p-3 h-28 bg-neutral-300 text-neutral-900 dark:bg-neutral-600 dark:text-neutral-100">
          {stderror}
        </div>
        <h1 className="text-lg font-semibold mb-3">Execution time:</h1>
        <div className="font-firaMono h-8 bg-neutral-300 text-neutral-900 dark:bg-neutral-600 dark:text-neutral-100">
          {executionTime}
        </div>
      </div>
      <textarea
        className="font-firaMono whitespace-pre text-base flex-grow bg-neutral-200 text-neutral-800 dark:bg-neutral-700 dark:text-neutral-100 p-5 resize-none outline-none"
        spellCheck={false}
        value={code}
        onChange={(e) => setCode(e.target.value)}
      />
    </div>
  )
}

PlaygroundPage.authenticate = { redirectTo: Routes.LoginPage() }
PlaygroundPage.getLayout = (page) => <Header title="Playground">{page}</Header>

export default PlaygroundPage
