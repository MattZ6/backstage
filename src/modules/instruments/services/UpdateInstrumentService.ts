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
  instrument_id: string;
  name: string;
  label: string;
}

@injectable()
class UpdateInstrumentService {
  constructor(
    @inject(INSTRUMENTS_REPOSITORY_INDENTIFIER)
    private instrumentsRepository: IIntrumentsRepository,

    @inject(CACHE_PROVIDER_INDENTIFIER)
    private cacheProvider: ICacheProvider
  ) {}

  public async execute({
    instrument_id,
    name,
    label,
  }: IRequest): Promise<Instrument> {
    const instrument = await this.instrumentsRepository.findById(instrument_id);

    if (!instrument) {
      throw new AppError('Instrument not found', EnumStatusCode.NotFound);
    }

    const instrumentWithThisName = await this.instrumentsRepository.findByName(
      name
    );

    if (instrumentWithThisName && instrumentWithThisName.id !== instrument_id) {
      throw new AppError(
        'There is already a instrument registered with this name',
        EnumStatusCode.Conflict
      );
    }

    instrument.name = name;
    instrument.label = label;

    const updatedInstrument = await this.instrumentsRepository.update(
      instrument
    );

    await this.cacheProvider.invalidatePrefix('instruments');

    return updatedInstrument;
  }
}

export default UpdateInstrumentService;
