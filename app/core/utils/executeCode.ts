export interface ExecuteCode {
  code: string
  language: string
  input?: string
}

export interface Execution {
  stdout: string
  stderr?: string
  time: number
  timeLimitExceeded: boolean
  didNotCrash: boolean
}

export async function executeCode(input: ExecuteCode): Promise<Execution> {
  if (!process.env.RUNNER_URL) throw new Error("process.env.RUNNER_URL missing")
  const execute_endpoint = process.env.RUNNER_URL + "/execute"
  const result = await fetch(execute_endpoint, {
    method: "POST",
    body: JSON.stringify(input),
  })

  if (!result.ok) {
    console.error(await result.text())
    throw new Error("Something went wrong...")
  }

  return await result.json()
}
