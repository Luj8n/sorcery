import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const ExecuteCode = z.object({
  code: z.string(),
  language: z.string(),
  input: z.string(),
})

interface RequestResult {
  stdout: string
  stderr?: string
  passed: boolean
  time_limit_exceeded: boolean
}

export default resolver.pipe(resolver.zod(ExecuteCode), resolver.authorize(), async (input) => {
  if (!process.env.RUNNER_URL) throw new Error("process.env.RUNNER_URL missing")
  const execute_endpoint = process.env.RUNNER_URL + "/submit"
  const result = await fetch(execute_endpoint, {
    method: "POST",
    body: JSON.stringify({
      language: "ruby",
      version: "3.0.1",
      code: input.code,
      test: {
        input: input.input,
        output: "",
      },
      timeout: 1000,
    }),
  })

  if (!result.ok) throw new Error("ouch")

  const r: RequestResult = await result.json()

  console.log(r)
  return r
})
