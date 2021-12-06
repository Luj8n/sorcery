import { useState, Suspense } from "react"
import { BlitzPage, Routes, invoke, useQuery, getSession } from "blitz"
import { MdSettings } from "react-icons/md"
import Header from "app/core/layouts/Layout"
import executeCode from "app/queries/executeCode"
import Select from "app/core/components/Select"
import { useSavedState } from "app/core/hooks/useSavedState"
import getRuntimes from "app/queries/getRuntimes"
import Editor from "app/core/components/Editor"

interface LanguageSeletProps {
  defaultLanguage: string
  onLanguageSelect: (option: string) => void
  defaultVersion: string
  onVersionSelect: (option: string) => void
}

const RuntimeSelect = ({
  defaultLanguage,
  onLanguageSelect,
  defaultVersion,
  onVersionSelect,
}: LanguageSeletProps) => {
  // forgive me
  // TODO: FIX THIS MESS
  const [runtimes] = useQuery(getRuntimes, null)

  const languages = runtimes
    .map((runtime) => runtime.language.slice(0, 1).toUpperCase() + runtime.language.slice(1))
    .filter((v, i, a) => a.indexOf(v) === i)

  const versions = runtimes
    .filter((runtime) => runtime.language === defaultLanguage.toLowerCase())
    .map((runtime) => runtime.version)

  languages.sort()

  return (
    <>
      <Select
        info="Change language"
        items={languages}
        defaultItem={defaultLanguage}
        onSelect={onLanguageSelect}
      />
      <Select
        info="Change version"
        items={versions}
        defaultItem={defaultVersion}
        onSelect={onVersionSelect}
      />
    </>
  )
}

export const getServerSideProps = async ({ req, res }: any) => {
  const session = await getSession(req, res)

  if (session.role !== "ADMIN") {
    return {
      redirect: {
        destination: Routes.Page404().pathname,
        permanent: false,
      },
    }
  }

  return { props: {} }
}

const PlaygroundPage: BlitzPage = () => {
  const [code, setCode] = useSavedState<string>("", "code")
  const [input, setInput] = useSavedState<string>("", "input")
  const [language, setLanguage] = useSavedState<string>("Javascript", "language")
  const [version, setVersion] = useSavedState<string>("15.10.0", "version")

  const [stdout, setStdout] = useState("")
  const [stderror, setStderror] = useState("")
  const [executionTime, setExecutionTime] = useState("")

  const [settingsWindow, setSettingsWindow] = useState(false)
  const [codeIsExecuting, setCodeIsExecuting] = useState(false)

  return (
    <div className="flex h-auto lg:h-full flex-col lg:flex-row">
      <div className="p-5 w-full lg:w-1/3 overflow-y-auto">
        <div className="flex justify-between items-center mb-5 w-full">
          <Suspense fallback="Loading...">
            <RuntimeSelect
              defaultLanguage={language}
              onLanguageSelect={setLanguage}
              defaultVersion={version}
              onVersionSelect={setVersion}
            />
          </Suspense>
          <MdSettings
            size={30}
            className="cursor-pointer"
            onClick={() => setSettingsWindow(!settingsWindow)}
          />
        </div>
        <h1 className="text-lg font-semibold mb-3">Input:</h1>
        <Editor value={input} onChange={setInput} className="h-52 mb-5 w-full resize-y" />
        <button
          className="h-14 w-full mb-7 font-semibold text-lg rounded-md bg-primary-600 text-neutral-50 hover:bg-primary-700 active:ring-4 disabled:active:ring-0 disabled:bg-primary-500 disabled:cursor-default"
          disabled={codeIsExecuting}
          onClick={() => {
            setCodeIsExecuting(true)
            setStdout("")
            setStderror("")
            setExecutionTime("")
            invoke(executeCode, { code, language: language.toLowerCase(), version, input })
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
        <div className="font-firaMono overflow-auto whitespace-pre mb-7 p-3 h-48 bg-neutral-300 text-neutral-900 dark:bg-neutral-600 dark:text-neutral-100 resize-y">
          {stdout}
        </div>
        <h1 className="text-lg font-semibold mb-3">stderr:</h1>
        <div className="font-firaMono overflow-auto whitespace-pre mb-7 p-3 h-48 bg-neutral-300 text-neutral-900 dark:bg-neutral-600 dark:text-neutral-100 resize-y">
          {stderror}
        </div>
        <h1 className="text-lg font-semibold mb-3">Execution time:</h1>
        <div className="font-firaMono h-8 bg-neutral-300 text-neutral-900 dark:bg-neutral-600 dark:text-neutral-100">
          {executionTime}
        </div>
      </div>
      <Editor value={code} onChange={setCode} className="flex-grow h-[700px] lg:h-auto" />
    </div>
  )
}

PlaygroundPage.authenticate = { redirectTo: Routes.LoginPage() }
PlaygroundPage.getLayout = (page) => <Header title="Playground">{page}</Header>

export default PlaygroundPage
