import { inject, injectable } from 'tsyringe';

import Instrument from '@modules/instruments/infra/typeorm/entities/Instrument';

import IFindInstrumentsDTO from '@modules/instruments/dtos/IFindInstrumentsDTO';

import IIntrumentsRepository, {
  INSTRUMENTS_REPOSITORY_INDENTIFIER,
} from '@modules/instruments/repositories/IIntrumentsRepository';

import ICacheProvider, {
  CACHE_PROVIDER_INDENTIFIER,
} from '@shared/container/providers/CacheProvider/models/ICacheProvider';

interface IRequest {
  field?: 'name' | 'label' | 'created_at';
  order?: 'ASC' | 'DESC';
}

@injectable()
class ListInstrumentsService {
  constructor(
    @inject(INSTRUMENTS_REPOSITORY_INDENTIFIER)
    private instrumentsRepository: IIntrumentsRepository,

    @inject(CACHE_PROVIDER_INDENTIFIER)
    private cacheProvider: ICacheProvider
  ) {}

  public async execute({ field, order }: IRequest): Promise<Instrument[]> {
    const params: IFindInstrumentsDTO = {
      field: field ?? 'name',
      order: order ?? 'ASC',
    };

    const CACHE_KEY = `instruments:${params.field}:${params.order}`;

    let instruments = await this.cacheProvider.recover<Instrument[]>(CACHE_KEY);

    if (!instruments) {
      instruments = await this.instrumentsRepository.find(params);

      await this.cacheProvider.store(CACHE_KEY, instruments);
    }

    return instruments;
  }
}

export default ListInstrumentsService;
