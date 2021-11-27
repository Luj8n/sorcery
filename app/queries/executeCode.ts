import { executeCode, Execution } from "app/core/utils/executeCode"
import { resolver } from "blitz"
import { z } from "zod"

const ExecuteCode = z.object({
  code: z.string(),
  language: z.string(),
  input: z.string(),
  version: z.string().optional(),
})

export default resolver.pipe(
  resolver.zod(ExecuteCode),
  resolver.authorize(),
  async (input): Promise<Execution> => {
    const execution = await executeCode(input)

    return execution
  }
)
