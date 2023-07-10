export namespace HttpProtocols {
  export type IRequest<B = unknown, P = unknown, Q = unknown, H = unknown> = {
    user?: {
      id: string
    }
    body: B
    params: P
    query: Q
    headers: H
    originalUrl: string
    method: string
  }

  export type IResponse<B = unknown> = {
    statusCode: number
    body?: B
  }
}
