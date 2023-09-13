import { PrismaClient } from '@prisma/client'

const connectionString = `${Bun.env.DATABASE_DRIVER}://${Bun.env.DATABASE_USER}:${Bun.env.DATABASE_PASSWORD}@${Bun.env.DATABASE_HOST}:${Bun.env.DATABASE_PORT}/${Bun.env.DATABASE_NAME}`

export const prisma = new PrismaClient({
  datasources: {
    db: {
      url: connectionString,
    },
  },
})
