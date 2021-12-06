import { z } from "zod"

const id = z.string()
const title = z.string().max(40)
const description = z.string().max(1000)
const difficulty = z.enum(["EASY", "MEDIUM", "HARD"])
const visibility = z.enum(["EVERYONE", "UNLISTED", "INVITED"])
const test = z.object({
  input: z.string(),
  expectedOutput: z.string(),
})
const tests = z.array(test).nonempty()
const solution = z.object({
  code: z.string(),
  language: z.string(),
})
const timeout = z.number().int().positive().max(3000).optional()

export const CreateProblem = z.object({
  title,
  description,
  difficulty,
  visibility,
  tests,
  solution,
  timeout,
})

export const UpdateProblem = z.object({
  id,
  title,
  description,
  difficulty,
  visibility,
  tests,
  solution,
  timeout,
})

export const DeleteProblem = z.object({
  id,
})
