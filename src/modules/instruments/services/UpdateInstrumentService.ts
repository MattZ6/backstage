import { inject, injectable } from 'tsyringe';

import AppError, { EnumStatusCode } from '@shared/errors/AppError';

import Instrument from '@modules/instruments/infra/typeorm/entities/Instrument';

import IIntrumentsRepository, {
  INSTRUMENTS_REPOSITORY_INDENTIFIER,
} from '@modules/instruments/repositories/IIntrumentsRepository';

interface IRequest {
  instrument_id: string;
  name: string;
  label: string;
}

@injectable()
class UpdateInstrumentService {
  constructor(
    @inject(INSTRUMENTS_REPOSITORY_INDENTIFIER)
    private instrumentsRepository: IIntrumentsRepository
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

    return this.instrumentsRepository.update(instrument);
  }
}

export default UpdateInstrumentService;
