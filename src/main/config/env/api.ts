import { config } from 'dotenv'

config()

export const apiConfig = {
  /** API */

  PORT: process.env.PORT,
}
