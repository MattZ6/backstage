import type { Express } from 'express'

export function setupHealthCheckEndpoint(app: Express) {
  app.get('/health', (_, res) =>
    res.json({
      uptime: process.uptime(),
      message: 'Ok',
      date: new Date(),
    }),
  )
}
