import { executeCode } from "./executeCode"

export interface ExecutedTest {
  input: string
  time: number
  time_limit_exceeded: boolean
  successful: boolean
  expectedOutput: string
  actualOutput: string
}

export interface ExecutionWithTests {
  executedTests: ExecutedTest[]
  passed: boolean
}

export interface Test {
  input: string
  expectedOutput: string
}

export interface ExecuteCodeWithTests {
  code: string
  language: string
  tests: Test[]
}

export async function executeCodeWithTests(
  input: ExecuteCodeWithTests
): Promise<ExecutionWithTests> {
  let executedTests: ExecutedTest[] = []

  for (const test of input.tests) {
    const executedCode = await executeCode({
      code: input.code,
      language: input.language,
      stdin: test.input,
    })

    executedTests.push({
      input: test.input,
      expectedOutput: test.expectedOutput,
      actualOutput: executedCode.stdout,
      ...executedCode,
    })
  }

  return {
    executedTests,
    passed: executedTests.every(
      (executedTest) =>
        executedTest.expectedOutput === executedTest.actualOutput && executedTest.successful
    ),
  }
}
