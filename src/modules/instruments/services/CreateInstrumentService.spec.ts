import faker from 'faker';

import AppError from '@shared/errors/AppError';

import FakeInstrumentsRepository from '@modules/instruments/repositories/fakes/FakeInstrumentsRepository';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import CreateInstrumentService from '@modules/instruments/services/CreateInstrumentService';

let fakeInstrumentsRepository: FakeInstrumentsRepository;
let fakeCacheProvider: FakeCacheProvider;
let createInstrument: CreateInstrumentService;

describe('CreateInstrument', () => {
  beforeEach(() => {
    fakeInstrumentsRepository = new FakeInstrumentsRepository();
    fakeCacheProvider = new FakeCacheProvider();

    createInstrument = new CreateInstrumentService(
      fakeInstrumentsRepository,
      fakeCacheProvider
    );
  });

  it('should be able to create a new instrument', async () => {
    const name = `${faker.name.title()} ${faker.name.title()}`;
    const label = faker.name.title();

    const instrument = await createInstrument.execute({
      name,
      label,
    });

    expect(instrument).toHaveProperty('id');
    expect(instrument.name).toBe(name);
    expect(instrument.label).toBe(label);
  });

  it('should not be able to create a new instrument with the name of another', async () => {
    const instrument = await fakeInstrumentsRepository.create({
      name: `${faker.name.title()} ${faker.name.title()}`,
      label: faker.name.title(),
    });

    await expect(
      createInstrument.execute({
        name: instrument.name,
        label: faker.name.title(),
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
