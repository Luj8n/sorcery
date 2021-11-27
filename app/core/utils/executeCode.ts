export interface ExecuteCode {
  code: string
  language: string
  input?: string
}

export interface Execution {
  stdout: string
  stderr?: string
  time: number
  time_limit_exceeded: boolean
  did_not_crash: boolean
}

export async function executeCode(input: ExecuteCode): Promise<Execution> {
  if (!process.env.RUNNER_URL) throw new Error("process.env.RUNNER_URL missing")
  const execute_endpoint = process.env.RUNNER_URL + "/execute"
  const result = await fetch(execute_endpoint, {
    method: "POST",
    body: JSON.stringify(input),
  })

  if (!result.ok) throw new Error(await result.text())

  return await result.json()
}
