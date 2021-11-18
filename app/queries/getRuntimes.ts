import { resolver } from "blitz"

interface Runtime {
  language: string
  version: string
  aliases: string[]
}

export default resolver.pipe(resolver.authorize(), async (): Promise<Runtime[]> => {
  if (!process.env.RUNNER_URL) throw new Error("process.env.RUNNER_URL missing")
  const execute_endpoint = process.env.RUNNER_URL + "/runtimes"
  const result = await fetch(execute_endpoint, {
    method: "GET",
  })

  if (!result.ok) throw new Error(await result.text())

  return await result.json()
})
