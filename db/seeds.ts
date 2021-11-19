import db from "./index"
import { SecurePassword } from "blitz"

//  This seed function is executed when you run `blitz db seed`.

//  Probably you want to use a library like https://chancejs.com
//  or https://github.com/Marak/Faker.js to easily generate
//  realistic data.

const seed = async () => {
  await db.$reset()

  await db.user.create({
    data: {
      email: "admin@admin.com",
      hashedPassword: await SecurePassword.hash("admin"),
      name: "SuperUser",
      role: "ADMIN",
    },
  })
}

export default seed
