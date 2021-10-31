import { z } from "zod"

const email = z
  .string({ invalid_type_error: "Email is required" })
  .email({ message: "Invalid email address" })
const password = z.string({ invalid_type_error: "Password is required" }).min(8).max(100)

export const Signup = z.object({
  email,
  password,
})

export const Login = z.object({
  email,
  password: z.string({ invalid_type_error: "Password is required" }),
})

export const ForgotPassword = z.object({
  email,
})

export const ResetPassword = z
  .object({
    password: password,
    passwordConfirmation: password,
    token: z.string(),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "Passwords don't match",
    path: ["passwordConfirmation"], // set the path of the error
  })

export const ChangePassword = z.object({
  currentPassword: z.string(),
  newPassword: password,
})
