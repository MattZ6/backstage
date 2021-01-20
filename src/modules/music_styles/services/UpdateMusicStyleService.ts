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
  music_style_id: string;
  name: string;
}

@injectable()
class UpdateMusicStyleService {
  constructor(
    @inject(MUSIC_STYLES_REPOSITORY_INDENTIFIER)
    private musicStylesRepository: IMusicStylesRepository,

    @inject(CACHE_PROVIDER_INDENTIFIER)
    private cacheProvider: ICacheProvider
  ) {}

  public async execute({
    music_style_id,
    name,
  }: IRequest): Promise<MusicStyle> {
    const musicStyle = await this.musicStylesRepository.findById(
      music_style_id
    );

    if (!musicStyle) {
      throw new AppError('Music style not found', EnumStatusCode.NotFound);
    }

    const musicStyleWithThisName = await this.musicStylesRepository.findByName(
      name
    );

    if (
      musicStyleWithThisName &&
      musicStyleWithThisName.id !== music_style_id
    ) {
      throw new AppError(
        'There is already a music style registered with this name',
        EnumStatusCode.Conflict
      );
    }

    musicStyle.name = name;

    const updatedMusicStyle = await this.musicStylesRepository.update(
      musicStyle
    );

    await this.cacheProvider.invalidatePrefix('music-styles');

    return updatedMusicStyle;
  }
}

export default UpdateMusicStyleService;
