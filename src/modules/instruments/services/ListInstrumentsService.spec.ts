import faker from 'faker';

import Instrument from '@modules/instruments/infra/typeorm/entities/Instrument';

import FakeInstrumentsRepository from '@modules/instruments/repositories/fakes/FakeInstrumentsRepository';
import ListInstrumentsService from '@modules/instruments/services/ListInstrumentsService';

let fakeInstrumentsRepository: FakeInstrumentsRepository;
let listInstruments: ListInstrumentsService;

describe('ListInstruments', () => {
  beforeEach(() => {
    fakeInstrumentsRepository = new FakeInstrumentsRepository();

    listInstruments = new ListInstrumentsService(fakeInstrumentsRepository);
  });

  it('should be able to list instruments', async () => {
    const length = 10;
    const requests: Promise<Instrument>[] = [];

    for (let i = 0; i < length; i++) {
      requests.push(
        fakeInstrumentsRepository.create({
          name: faker.name.title(),
          label: faker.name.title(),
        })
      );
    }

    const instruments = await Promise.all(requests);

    const instrumentsSearched = await listInstruments.execute({});

    expect(instrumentsSearched).toHaveLength(length);
    expect(instrumentsSearched).toEqual(expect.arrayContaining(instruments));
  });

  it('should be able to list instruments ordered by name ASC as default', async () => {
    const length = 13;
    const requests: Promise<Instrument>[] = [];

    for (let i = 0; i < length; i++) {
      requests.push(
        fakeInstrumentsRepository.create({
          name: faker.name.title(),
          label: faker.name.title(),
        })
      );
    }

    const instruments = await Promise.all(requests);

    const instrumentsSearched = await listInstruments.execute({});

    expect(instruments.sort((a, b) => (a.name < b.name ? 1 : -1))).toEqual(
      instrumentsSearched
    );
  });

  it('should be able to list instruments ordered by created_at DESC', async () => {
    const length = 15;
    const requests: Promise<Instrument>[] = [];

    for (let i = 0; i < length; i++) {
      requests.push(
        fakeInstrumentsRepository.create({
          name: faker.name.title(),
          label: faker.name.title(),
        })
      );
    }

    const instruments = await Promise.all(requests);

    const instrumentsSearched = await listInstruments.execute({
      field: 'created_at',
      order: 'DESC',
    });

    expect(
      instruments.sort((a, b) => (a.created_at < b.created_at ? -1 : 1))
    ).toEqual(instrumentsSearched);
  });
});
