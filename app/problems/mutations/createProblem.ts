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
        expectedOutput: z.string(),
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
    if (!executedCodeWithTests.passed) throw new Error("Code didn't pass all tests")
    if (
      input.timeout &&
      executedCodeWithTests.executedTests.some((executedTest) => executedTest.time > input.timeout!)
    )
      throw new Error("Code timed out")

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
            combinedExecutionTime: executedCodeWithTests.executedTests.reduce(
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
            data: input.tests,
          },
        },
      },
    })

    return problem
  }
)
