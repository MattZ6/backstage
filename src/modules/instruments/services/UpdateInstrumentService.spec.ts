import faker from 'faker';

import AppError from '@shared/errors/AppError';

import FakeInstrumentsRepository from '@modules/instruments/repositories/fakes/FakeInstrumentsRepository';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import UpdateInstrumentService from '@modules/instruments/services/UpdateInstrumentService';

let fakeInstrumentsRepository: FakeInstrumentsRepository;
let fakeCacheProvider: FakeCacheProvider;
let updateInstrument: UpdateInstrumentService;

describe('UpdateInstrument', () => {
  beforeEach(() => {
    fakeInstrumentsRepository = new FakeInstrumentsRepository();
    fakeCacheProvider = new FakeCacheProvider();

    updateInstrument = new UpdateInstrumentService(
      fakeInstrumentsRepository,
      fakeCacheProvider
    );
  });

  it('should be able to update the data of an instrument', async () => {
    const { id } = await fakeInstrumentsRepository.create({
      name: faker.name.title(),
      label: faker.name.title(),
    });

    const updatedName = 'Guitar';
    const updatedLabel = 'guitarrist';

    const updatedInstrument = await updateInstrument.execute({
      instrument_id: id,
      name: updatedName,
      label: updatedLabel,
    });

    expect(updatedInstrument.name).toBe(updatedName);
    expect(updatedInstrument.label).toBe(updatedLabel);
  });

  it('should not be able to update the data of a non existing instrument', async () => {
    await expect(
      updateInstrument.execute({
        instrument_id: faker.random.uuid(),
        name: faker.name.title(),
        label: faker.name.title(),
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to change to another instrument name', async () => {
    const { name } = await fakeInstrumentsRepository.create({
      name: faker.name.title(),
      label: faker.name.title(),
    });

    const instrument = await fakeInstrumentsRepository.create({
      name: faker.name.title(),
      label: faker.name.title(),
    });

    await expect(
      updateInstrument.execute({
        instrument_id: instrument.id,
        name,
        label: faker.name.title(),
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
