import { ICreateErrorRepository } from '@application/protocols/repositories/error'

import { prisma } from '..'

export class PrismaErrorsRepository implements ICreateErrorRepository {
  async create(
    data: ICreateErrorRepository.Input,
  ): Promise<ICreateErrorRepository.Output> {
    const { exception_was_thrown_in, http_method, resource_url, stack } = data

    const error = await prisma.error.create({
      data: {
        exception_was_thrown_in,
        http_method,
        resource_url,
        stack,
      },
    })

    return error
  }
}
