import { inject, injectable } from 'tsyringe';

import AppError, { EnumStatusCode } from '@shared/errors/AppError';

import MusicStyle from '@modules/music_styles/infra/typeorm/entities/MusicStyle';

import IMusicStylesRepository, {
  MUSIC_STYLES_REPOSITORY_INDENTIFIER,
} from '@modules/music_styles/repositories/IMusicStylesRepository';

interface IRequest {
  music_style_id: string;
  name: string;
}

@injectable()
class UpdateMusicStyleService {
  constructor(
    @inject(MUSIC_STYLES_REPOSITORY_INDENTIFIER)
    private musicStylesRepository: IMusicStylesRepository
  ) {}

  public async execute({
    music_style_id,
    name,
  }: IRequest): Promise<MusicStyle> {
    const instrument = await this.musicStylesRepository.findById(
      music_style_id
    );

    if (!instrument) {
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

    instrument.name = name;

    return this.musicStylesRepository.update(instrument);
  }
}

export default UpdateMusicStyleService;
