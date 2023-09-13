import type { ElysiaApp } from '@main/adapters/elysia/types'

export function setupHealthCheckEndpoint(app: ElysiaApp) {
  app.get('/health', () => ({
    uptime: process.uptime(),
    date: new Date(),
  }))
}
