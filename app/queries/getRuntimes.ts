import { resolver } from "blitz"
import { getRuntimes } from "app/core/utils/getRuntimes"

export interface Runtime {
  language: string
  version: string
  aliases: string[]
}

export default resolver.pipe(resolver.authorize(), async (): Promise<Runtime[]> => {
  const runtimes = await getRuntimes()

  return runtimes
})
