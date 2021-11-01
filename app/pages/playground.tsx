import { useState } from "react"
import { BlitzPage, Routes } from "blitz"
import Header from "app/core/layouts/Layout"
import CodeMirror from "@uiw/react-codemirror"

const PlaygroundPage: BlitzPage = () => {
  const [code, setCode] = useState("console.log('hello world!');")

  return (
    <div className="h-full bg-primary-500">
      <p>text</p>
      {/* <CodeMirror
        theme="dark"
        className="text-base w-1/2 float-right max-h-1/2 min-h-1/2"
        value={code}
        onChange={(a, b) => {
          setCode(a)
        }}
      /> */}
    </div>
  )
}

PlaygroundPage.authenticate = { redirectTo: Routes.LoginPage() }
PlaygroundPage.getLayout = (page) => <Header title="Test">{page}</Header>

export default PlaygroundPage
