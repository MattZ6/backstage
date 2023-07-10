import { HttpProtocols } from './Http'

export interface IController {
  handle(request: HttpProtocols.IRequest): Promise<HttpProtocols.IResponse>
}
