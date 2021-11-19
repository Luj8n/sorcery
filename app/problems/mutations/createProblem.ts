import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const CreateProblem = z.object({
  name: z.string(),
})

export default resolver.pipe(resolver.zod(CreateProblem), resolver.authorize(), async (input) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  // TODO: a lot to do
  let title = "asd"
  await db.user.update({
    where: { email: "asd" },
    data: {
      problems: {
        create: {
          description: "",
          title: title,
          difficulty: "MEDIUM",
          type: "IO",
          visibility: "EVERYONE",
        },
      },
    },
  })

  const problem = db.problem.findFirst({ where: { title: title } })

  return problem
})
