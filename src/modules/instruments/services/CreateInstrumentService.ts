import { inject, injectable } from 'tsyringe';

import AppError, { EnumStatusCode } from '@shared/errors/AppError';

import Instrument from '@modules/instruments/infra/typeorm/entities/Instrument';

import IIntrumentsRepository, {
  INSTRUMENTS_REPOSITORY_INDENTIFIER,
} from '@modules/instruments/repositories/IIntrumentsRepository';

interface IRequest {
  name: string;
  label: string;
}

@injectable()
class CreateInstrumentService {
  constructor(
    @inject(INSTRUMENTS_REPOSITORY_INDENTIFIER)
    private instrumentsRepository: IIntrumentsRepository
  ) {}

  public async execute({ name, label }: IRequest): Promise<Instrument> {
    const instrumentWithThisName = await this.instrumentsRepository.findByName(
      name
    );

    if (instrumentWithThisName) {
      throw new AppError(
        'There is already an instrument registered with this name',
        EnumStatusCode.Conflict
      );
    }

    return this.instrumentsRepository.create({ name, label });
  }
}

export default CreateInstrumentService;
