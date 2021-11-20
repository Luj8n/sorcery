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
      name: "Admin",
      role: "ADMIN",
    },
  })

  const categoriesData = [
    { name: "Strings", description: "You have to manipulate strings" },
    { name: "Numbers", description: "You have to manipulate numbers" },
    { name: "Recursion", description: "You have to use recursion" },
  ]

  for (const categoryData of categoriesData) {
    await db.category.create({
      data: {
        ...categoryData,
      },
    })
  }

  await db.problem.create({
    data: {
      title: "Reverse a string",
      description: "TODO",
      difficulty: "EASY",
      type: "IO",
      visibility: "EVERYONE",
      user: {
        connect: { email: "admin@admin.com" },
      },
      categories: {
        connect: [{ id: (await db.category.findFirst({ where: { name: "Strings" } }))?.id }],
      },
      likedBy: { connect: [{ email: "admin@admin.com" }] },
      tests: {
        createMany: {
          data: [{ input: "abcdef", expectedOutput: "fedcba" }],
        },
      },
    },
  })
}

export default seed
