import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import EnumStatusCode from '@shared/dtos/EnumStatusCode';

import MusicStyle from '@modules/music_styles/infra/typeorm/entities/MusicStyle';

import IMusicStylesRepository, {
  MUSIC_STYLES_REPOSITORY_INDENTIFIER,
} from '@modules/music_styles/repositories/IMusicStylesRepository';

import ICacheProvider, {
  CACHE_PROVIDER_INDENTIFIER,
} from '@shared/container/providers/CacheProvider/models/ICacheProvider';

interface IRequest {
  name: string;
}

@injectable()
class CreateMusicStyleService {
  constructor(
    @inject(MUSIC_STYLES_REPOSITORY_INDENTIFIER)
    private musicStylesRepository: IMusicStylesRepository,

    @inject(CACHE_PROVIDER_INDENTIFIER)
    private cacheProvider: ICacheProvider
  ) {}

  public async execute({ name }: IRequest): Promise<MusicStyle> {
    const musicStyleWithThisName = await this.musicStylesRepository.findByName(
      name
    );

    if (musicStyleWithThisName) {
      throw new AppError(
        'There is already a music style registered with this name',
        EnumStatusCode.Conflict
      );
    }

    const musicStyle = await this.musicStylesRepository.create({ name });

    await this.cacheProvider.invalidatePrefix('music-styles');

    return musicStyle;
  }
}

export default CreateMusicStyleService;
