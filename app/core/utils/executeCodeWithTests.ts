import { executeCode } from "./executeCode"

export interface ExecutionWithTest {
  input: string
  expectedOutput: string
  actual_output: string
  stderr?: string
  time: number
  timeLimitExceeded: boolean
  didNotCrash: boolean
}

export interface ExecuteWithTests {
  executions: ExecutionWithTest[]
  tests_passed: number
}

export interface Test {
  input: string
  expectedOutput: string
}

export interface ExecuteCodeWithTests {
  code: string
  language: string
  version?: string
  tests: Test[]
}

export async function executeCodeWithTests(input: ExecuteCodeWithTests): Promise<ExecuteWithTests> {
  if (!process.env.RUNNER_URL) throw new Error("process.env.RUNNER_URL missing")
  const execute_endpoint = process.env.RUNNER_URL + "/run_tests"
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
