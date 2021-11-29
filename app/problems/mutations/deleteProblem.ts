import { resolver } from "blitz"
import db from "db"
import { DeleteProblem } from "../validations"

export default resolver.pipe(resolver.zod(DeleteProblem), resolver.authorize(), async ({ id }) => {
  const problem = await db.problem.deleteMany({ where: { id } })

  return problem
})
