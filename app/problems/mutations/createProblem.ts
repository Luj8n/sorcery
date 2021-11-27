import { executeCodeWithTests } from "app/core/utils/executeCodeWithTests"
import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const CreateProblem = z.object({
  title: z.string().max(40),
  description: z.string().max(1000),
  difficulty: z.enum(["EASY", "MEDIUM", "HARD"]),
  visibility: z.enum(["EVERYONE", "UNLISTED", "INVITED"]),
  tests: z
    .array(
      z.object({
        input: z.string(),
        expected_output: z.string(),
      })
    )
    .nonempty(),
  solution: z.object({
    code: z.string(),
    language: z.string(),
  }),
  timeout: z.number().int().positive().max(3000).optional(),
})

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
        type: "IO",
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
              expectedOutput: test.expected_output,
            })),
          },
        },
      },
    })

    return problem
  }
)
