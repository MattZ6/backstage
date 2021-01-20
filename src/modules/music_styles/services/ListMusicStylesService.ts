import { inject, injectable } from 'tsyringe';

import MusicStyle from '@modules/music_styles/infra/typeorm/entities/MusicStyle';

import IFindMusicStylesDTO from '@modules/music_styles/dtos/IFindMusicStylesDTO';

import IMusicStylesRepository, {
  MUSIC_STYLES_REPOSITORY_INDENTIFIER,
} from '@modules/music_styles/repositories/IMusicStylesRepository';

import ICacheProvider, {
  CACHE_PROVIDER_INDENTIFIER,
} from '@shared/container/providers/CacheProvider/models/ICacheProvider';

interface IRequest {
  field?: 'name' | 'created_at';
  order?: 'ASC' | 'DESC';
}

@injectable()
class ListMusicStylesService {
  constructor(
    @inject(MUSIC_STYLES_REPOSITORY_INDENTIFIER)
    private musicStylesRepository: IMusicStylesRepository,

    @inject(CACHE_PROVIDER_INDENTIFIER)
    private cacheProvider: ICacheProvider
  ) {}

  public async execute({ field, order }: IRequest): Promise<MusicStyle[]> {
    const params: IFindMusicStylesDTO = {
      field: field ?? 'name',
      order: order ?? 'ASC',
    };

    const CACHE_KEY = `music-styles:${params.field}:${params.order}`;

    let musicStyles = await this.cacheProvider.recover<MusicStyle[]>(CACHE_KEY);

    if (!musicStyles) {
      musicStyles = await this.musicStylesRepository.find(params);

      await this.cacheProvider.store(CACHE_KEY, musicStyles);
    }

    return musicStyles;
  }
}

export default ListMusicStylesService;
