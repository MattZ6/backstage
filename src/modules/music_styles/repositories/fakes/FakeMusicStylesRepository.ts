import { v4 } from 'uuid';

import MusicStyle from '@modules/music_styles/infra/typeorm/entities/MusicStyle';

import ICreateMusicStyleDTO from '@modules/music_styles/dtos/ICreateMusicStyleDTO';
import IFindMusicStylesDTO from '@modules/music_styles/dtos/IFindMusicStylesDTO';
import IMusicStylesRepository from '@modules/music_styles/repositories/IMusicStylesRepository';

class FakeMusicStylesRepository implements IMusicStylesRepository {
  private musicStyles: MusicStyle[];

  constructor() {
    this.musicStyles = [];
  }

  public async create({ name }: ICreateMusicStyleDTO): Promise<MusicStyle> {
    const musicStyle = new MusicStyle();

    Object.assign(musicStyle, {
      id: v4(),
      name,
      created_at: new Date(),
      updated_at: new Date(),
    } as MusicStyle);

    this.musicStyles.push(musicStyle);

    return musicStyle;
  }

  public async update(musicStyle: MusicStyle): Promise<MusicStyle> {
    const index = this.musicStyles.findIndex(x => x.id === musicStyle.id);

    Object.assign(this.musicStyles[index], {
      ...musicStyle,
      updated_at: new Date(),
    });

    return this.musicStyles[index];
  }

  public async find({
    field,
    order,
  }: IFindMusicStylesDTO): Promise<MusicStyle[]> {
    const IF_RETURN = order === 'ASC' ? 1 : -1;
    const ELSE_RETURN = order === 'ASC' ? -1 : 1;

    return this.musicStyles.sort((a, b) =>
      a[field] < b[field] ? IF_RETURN : ELSE_RETURN
    );
  }

  public async findById(id: string): Promise<MusicStyle | undefined> {
    return this.musicStyles.find(musicStyle => musicStyle.id === id);
  }

  public async findByName(name: string): Promise<MusicStyle | undefined> {
    return this.musicStyles.find(
      musicStyle => musicStyle.name.toLowerCase() === name.toLowerCase()
    );
  }
}

export default FakeMusicStylesRepository;
