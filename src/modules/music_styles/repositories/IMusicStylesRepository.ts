import MusicStyle from '@modules/music_styles/infra/typeorm/entities/MusicStyle';

import ICreateMusicStyleDTO from '@modules/music_styles/dtos/ICreateMusicStyleDTO';
import IFindMusicStylesDTO from '@modules/music_styles/dtos/IFindMusicStylesDTO';

export const MUSIC_STYLES_REPOSITORY_INDENTIFIER = 'MusicStylesRepository';

export default interface IMusicStylesRepository {
  create(data: ICreateMusicStyleDTO): Promise<MusicStyle>;
  update(data: MusicStyle): Promise<MusicStyle>;
  find(data: IFindMusicStylesDTO): Promise<MusicStyle[]>;
  findById(id: string): Promise<MusicStyle | undefined>;
  findByName(name: string): Promise<MusicStyle | undefined>;
}
