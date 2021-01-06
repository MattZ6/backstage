import { inject, injectable } from 'tsyringe';

import MusicStyle from '@modules/music_styles/infra/typeorm/entities/MusicStyle';

import IMusicStylesRepository, {
  MUSIC_STYLES_REPOSITORY_INDENTIFIER,
} from '@modules/music_styles/repositories/IMusicStylesRepository';

interface IRequest {
  field?: 'name' | 'created_at';
  order?: 'ASC' | 'DESC';
}

@injectable()
class ListMusicStylesService {
  constructor(
    @inject(MUSIC_STYLES_REPOSITORY_INDENTIFIER)
    private musicStylesRepository: IMusicStylesRepository
  ) {}

  public async execute({ field, order }: IRequest): Promise<MusicStyle[]> {
    return this.musicStylesRepository.find({
      field: field ?? 'name',
      order: order ?? 'ASC',
    });
  }
}

export default ListMusicStylesService;
