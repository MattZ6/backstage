import { getRepository, Repository } from 'typeorm';

import MusicStyle from '@modules/music_styles/infra/typeorm/entities/MusicStyle';

import IMusicStylesRepository from '@modules/music_styles/repositories/IMusicStylesRepository';
import ICreateMusicStyleDTO from '@modules/music_styles/dtos/ICreateMusicStyleDTO';
import IFindMusicStylesDTO from '@modules/music_styles/dtos/IFindMusicStylesDTO';

class MusicStylesRepository implements IMusicStylesRepository {
  private repository: Repository<MusicStyle>;

  constructor() {
    this.repository = getRepository(MusicStyle);
  }

  create({ name }: ICreateMusicStyleDTO): Promise<MusicStyle> {
    const instrument = this.repository.create({
      name,
    });

    return this.repository.save(instrument);
  }

  update(musicStyle: MusicStyle): Promise<MusicStyle> {
    return this.repository.save(musicStyle);
  }

  find({ field, order }: IFindMusicStylesDTO): Promise<MusicStyle[]> {
    return this.repository.find({
      order: {
        [field]: order,
      },
    });
  }

  findById(id: string): Promise<MusicStyle | undefined> {
    return this.repository.findOne({
      where: { id },
    });
  }

  findByName(name: string): Promise<MusicStyle | undefined> {
    return this.repository
      .createQueryBuilder('musicStyle')
      .where(`LOWER(musicStyle.name) = LOWER('${name}')`)
      .getOne();
  }
}

export default MusicStylesRepository;
