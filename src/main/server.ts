import { config } from 'dotenv'

import { app } from '@main/config/app'

import { apiConfig } from './config/env'

config()

function printError(message: string) {
  console.log('\x1b[31m%s\x1b[0m', message)
}

async function startServer() {
  console.log('\n⏳ Starting server...')

  try {
    app.listen(apiConfig.PORT, () => {
      console.log(`🚀 Server is running in port ${apiConfig.PORT}\n`)
    })
  } catch (error) {
    printError('-----------------------------------------')
    printError('----- Server initialization failure -----')
    printError('-----------------------------------------')

    console.log('\n')

    console.log(JSON.stringify(error, null, 2))
  }
}

startServer()
