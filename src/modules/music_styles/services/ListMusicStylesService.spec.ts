import faker from 'faker';

import MusicStyle from '@modules/music_styles/infra/typeorm/entities/MusicStyle';

import FakeMusicStylesRepository from '@modules/music_styles/repositories/fakes/FakeMusicStylesRepository';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import ListMusicStylesService from '@modules/music_styles/services/ListMusicStylesService';

let fakeMusicStylesRepository: FakeMusicStylesRepository;
let fakeCacheProvider: FakeCacheProvider;
let listMusicStyles: ListMusicStylesService;

describe('ListMusicStyles', () => {
  beforeEach(() => {
    fakeMusicStylesRepository = new FakeMusicStylesRepository();
    fakeCacheProvider = new FakeCacheProvider();

    listMusicStyles = new ListMusicStylesService(
      fakeMusicStylesRepository,
      fakeCacheProvider
    );
  });

  it('should be able to list music styles', async () => {
    const length = 10;
    const requests: Promise<MusicStyle>[] = [];

    for (let i = 0; i < length; i++) {
      requests.push(
        fakeMusicStylesRepository.create({
          name: faker.name.title(),
        })
      );
    }

    const musicStyles = await Promise.all(requests);

    const musicStylesSearched = await listMusicStyles.execute({});

    expect(musicStylesSearched).toHaveLength(length);
    expect(musicStylesSearched).toEqual(expect.arrayContaining(musicStyles));
  });

  it('should be able to list music styles ordered by name ASC as default', async () => {
    const length = 13;
    const requests: Promise<MusicStyle>[] = [];

    for (let i = 0; i < length; i++) {
      requests.push(
        fakeMusicStylesRepository.create({
          name: faker.name.title(),
        })
      );
    }

    const musicStyles = await Promise.all(requests);

    const musicStylesSearched = await listMusicStyles.execute({});

    expect(musicStyles.sort((a, b) => (a.name < b.name ? 1 : -1))).toEqual(
      musicStylesSearched
    );
  });

  it('should be able to list music styles ordered by created_at DESC', async () => {
    const length = 15;
    const requests: Promise<MusicStyle>[] = [];

    for (let i = 0; i < length; i++) {
      requests.push(
        fakeMusicStylesRepository.create({
          name: faker.name.title(),
        })
      );
    }

    const musicStyles = await Promise.all(requests);

    const musicStylesSearched = await listMusicStyles.execute({
      field: 'created_at',
      order: 'DESC',
    });

    expect(
      musicStyles.sort((a, b) => (a.created_at < b.created_at ? -1 : 1))
    ).toEqual(musicStylesSearched);
  });
});
