import { inject, injectable } from 'tsyringe';

import AppError, { EnumStatusCode } from '@shared/errors/AppError';

import MusicStyle from '@modules/music_styles/infra/typeorm/entities/MusicStyle';

import IMusicStylesRepository, {
  MUSIC_STYLES_REPOSITORY_INDENTIFIER,
} from '@modules/music_styles/repositories/IMusicStylesRepository';

interface IRequest {
  name: string;
}

@injectable()
class CreateMusicStyleService {
  constructor(
    @inject(MUSIC_STYLES_REPOSITORY_INDENTIFIER)
    private musicStylesRepository: IMusicStylesRepository
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

    return this.musicStylesRepository.create({ name });
  }
}

export default CreateMusicStyleService;
