export namespace HttpProtocols {
  export type IRequest<
    TBody = unknown,
    TParams = unknown,
    TQuery = unknown,
    THeaders = unknown,
  > = {
    user?: {
      id: string
    }
    body: TBody
    params: TParams
    query: TQuery
    headers: THeaders
    originalUrl: string
    method: string
  }

  export type IResponse<TBody = unknown> = {
    statusCode: number
    body?: TBody | null
  }
}
