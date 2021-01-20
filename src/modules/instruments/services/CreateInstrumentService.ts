import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import EnumStatusCode from '@shared/dtos/EnumStatusCode';

import Instrument from '@modules/instruments/infra/typeorm/entities/Instrument';

import IIntrumentsRepository, {
  INSTRUMENTS_REPOSITORY_INDENTIFIER,
} from '@modules/instruments/repositories/IIntrumentsRepository';

import ICacheProvider, {
  CACHE_PROVIDER_INDENTIFIER,
} from '@shared/container/providers/CacheProvider/models/ICacheProvider';

interface IRequest {
  name: string;
  label: string;
}

@injectable()
class CreateInstrumentService {
  constructor(
    @inject(INSTRUMENTS_REPOSITORY_INDENTIFIER)
    private instrumentsRepository: IIntrumentsRepository,

    @inject(CACHE_PROVIDER_INDENTIFIER)
    private cacheProvider: ICacheProvider
  ) {}

  public async execute({ name, label }: IRequest): Promise<Instrument> {
    const instrumentWithThisName = await this.instrumentsRepository.findByName(
      name
    );

    if (instrumentWithThisName) {
      throw new AppError(
        'There is already a instrument registered with this name',
        EnumStatusCode.Conflict
      );
    }

    const instrument = await this.instrumentsRepository.create({ name, label });

    await this.cacheProvider.invalidatePrefix('instruments');

    return instrument;
  }
}

export default CreateInstrumentService;
