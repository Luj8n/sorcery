import { resolver } from "blitz"
import db from "db"
import { UpdateProblem } from "../validations"

export default resolver.pipe(
  resolver.zod(UpdateProblem),
  resolver.authorize(),
  async ({ id, ...data }) => {
    // TODO: maybe don't delete all the tests, just the ones that are new, and remove the unused ones
    await db.test.deleteMany({ where: { problemId: id } })

    const problem = await db.problem.update({
      where: { id },
      data: { ...data, tests: { createMany: { data: data.tests } } },
    })

    return problem
  }
)
