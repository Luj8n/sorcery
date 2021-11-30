export interface Runtime {
  language: string
  version: string
  aliases: string[]
}

export async function getRuntimes(): Promise<Runtime[]> {
  if (!process.env.RUNNER_URL) throw new Error("process.env.RUNNER_URL missing")
  const execute_endpoint = process.env.RUNNER_URL + "/runtimes"
  const result = await fetch(execute_endpoint, {
    method: "GET",
  })

  if (!result.ok) {
    console.error(await result.text())
    throw new Error("Something went wrong...")
  }

  return await result.json()
}
