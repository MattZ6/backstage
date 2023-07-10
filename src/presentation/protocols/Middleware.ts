import { HttpProtocols } from './Http'

export interface IMiddleware {
  handle(request: HttpProtocols.IRequest): Promise<HttpProtocols.IResponse>
}
