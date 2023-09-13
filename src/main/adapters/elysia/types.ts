import Elysia, { ElysiaInstance } from 'elysia'

type TokenUser = {
  id: string
}

export type CustomElysiaInstance = ElysiaInstance<{
  store: { user?: TokenUser }
}>

export type ElysiaApp = Elysia<string, CustomElysiaInstance>
