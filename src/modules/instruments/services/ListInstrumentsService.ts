import { inject, injectable } from 'tsyringe';

import Instrument from '@modules/instruments/infra/typeorm/entities/Instrument';

import IIntrumentsRepository, {
  INSTRUMENTS_REPOSITORY_INDENTIFIER,
} from '@modules/instruments/repositories/IIntrumentsRepository';

interface IRequest {
  field?: 'name' | 'label' | 'created_at';
  order?: 'ASC' | 'DESC';
}

@injectable()
class ListInstrumentsService {
  constructor(
    @inject(INSTRUMENTS_REPOSITORY_INDENTIFIER)
    private instrumentsRepository: IIntrumentsRepository
  ) {}

  public async execute({ field, order }: IRequest): Promise<Instrument[]> {
    return this.instrumentsRepository.find({
      field: field ?? 'name',
      order: order ?? 'ASC',
    });
  }
}

export default ListInstrumentsService;
