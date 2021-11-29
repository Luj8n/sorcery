import { executeCodeWithTests } from "app/core/utils/executeCodeWithTests"
import { resolver } from "blitz"
import db from "db"
import { CreateProblem } from "../validations"

export default resolver.pipe(
  resolver.zod(CreateProblem),
  resolver.authorize(),
  async (input, ctx) => {
    // TODO: add category support

    const executedCodeWithTests = await executeCodeWithTests({
      ...input.solution,
      tests: input.tests,
    })

    // TODO: provide more error info
    if (executedCodeWithTests.tests_passed !== input.tests.length)
      throw new Error("Code didn't pass all tests")
    if (
      input.timeout &&
      executedCodeWithTests.executions.some((executedTest) => executedTest.time > input.timeout!)
    )
      throw new Error("Time limit exceeded")

    const problem = await db.problem.create({
      data: {
        title: input.title,
        description: input.description,
        difficulty: input.difficulty,
        type: "IO", // for now just IO
        visibility: input.visibility,
        user: {
          connect: { id: ctx.session.userId },
        },
        solutions: {
          create: {
            code: input.solution.code,
            language: input.solution.language,
            combinedExecutionTime: executedCodeWithTests.executions.reduce(
              (prev, curr) => prev + curr.time,
              0
            ),
            user: {
              connect: { id: ctx.session.userId },
            },
          },
        },
        tests: {
          createMany: {
            data: input.tests.map((test) => ({
              input: test.input,
              expectedOutput: test.expectedOutput,
            })),
          },
        },
      },
    })

    return problem
  }
)
