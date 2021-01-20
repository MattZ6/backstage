import faker from 'faker';

import AppError from '@shared/errors/AppError';

import FakeMusicStylesRepository from '@modules/music_styles/repositories/fakes/FakeMusicStylesRepository';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import UpdateMusicStyleService from '@modules/music_styles/services/UpdateMusicStyleService';

let fakeMusicStylesRepository: FakeMusicStylesRepository;
let fakeCacheProvider: FakeCacheProvider;
let updateMusicStyle: UpdateMusicStyleService;

describe('UpdateMusicStyle', () => {
  beforeEach(() => {
    fakeMusicStylesRepository = new FakeMusicStylesRepository();
    fakeCacheProvider = new FakeCacheProvider();

    updateMusicStyle = new UpdateMusicStyleService(
      fakeMusicStylesRepository,
      fakeCacheProvider
    );
  });

  it('should be able to update the data of an existing music style', async () => {
    const { id } = await fakeMusicStylesRepository.create({
      name: faker.name.title(),
    });

    const updatedName = "Rock'n roll";

    const updatedMusicStyle = await updateMusicStyle.execute({
      music_style_id: id,
      name: updatedName,
    });

    expect(updatedMusicStyle.name).toBe(updatedName);
  });

  it('should not be able to update the data of a non existing music style', async () => {
    await expect(
      updateMusicStyle.execute({
        music_style_id: faker.random.uuid(),
        name: faker.name.title(),
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to change to another music style name', async () => {
    const { name } = await fakeMusicStylesRepository.create({
      name: faker.name.title(),
    });

    const musicStyle = await fakeMusicStylesRepository.create({
      name: faker.name.title(),
    });

    await expect(
      updateMusicStyle.execute({
        music_style_id: musicStyle.id,
        name,
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
