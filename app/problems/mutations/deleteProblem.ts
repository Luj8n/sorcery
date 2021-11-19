import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const DeleteProblem = z.object({
  id: z.number(),
})

export default resolver.pipe(resolver.zod(DeleteProblem), resolver.authorize(), async ({ id }) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const problem = await db.problem.deleteMany({ where: { id } })

  return problem
})
