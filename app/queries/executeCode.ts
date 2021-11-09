import { resolver } from "blitz"
import { z } from "zod"

const ExecuteCode = z.object({
  code: z.string(),
  language: z.string(),
  stdin: z.string(),
})

interface RequestResult {
  stdout: string
  stderr?: string
  time_limit_exceeded: boolean
}

export default resolver.pipe(
  resolver.zod(ExecuteCode),
  resolver.authorize(),
  async (input): Promise<RequestResult> => {
    if (!process.env.RUNNER_URL) throw new Error("process.env.RUNNER_URL missing")
    const execute_endpoint = process.env.RUNNER_URL + "/execute"
    const result = await fetch(execute_endpoint, {
      method: "POST",
      body: JSON.stringify({
        language: input.language,
        code: input.code,
        stdin: input.stdin,
      }),
    })

    if (!result.ok) throw new Error("Something has gone wrong...")

    return await result.json()
  }
)
