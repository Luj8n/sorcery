import { resolver, NotFoundError } from "blitz"
import db from "db"
import { z } from "zod"

const GetProblem = z.object({
  // This accepts type of undefined, but is required at runtime
  id: z.string().optional().refine(Boolean, "Required"),
})

export default resolver.pipe(resolver.zod(GetProblem), resolver.authorize(), async ({ id }) => {
  const problem = await db.problem.findFirst({ where: { id } })

  if (!problem) throw new NotFoundError()

  return problem
})
