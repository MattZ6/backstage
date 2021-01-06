import { v4 } from 'uuid';

import Instrument from '@modules/instruments/infra/typeorm/entities/Instrument';

import ICreateInstrumentDTO from '@modules/instruments/dtos/ICreateInstrumentDTO';
import IListInstrumentsDTO from '@modules/instruments/dtos/IFindInstrumentsDTO';
import IIntrumentsRepository from '@modules/instruments/repositories/IIntrumentsRepository';

class FakeInstrumentsRepository implements IIntrumentsRepository {
  private instruments: Instrument[];

  constructor() {
    this.instruments = [];
  }

  public async create({
    name,
    label,
  }: ICreateInstrumentDTO): Promise<Instrument> {
    const instrument = new Instrument();

    Object.assign(instrument, {
      id: v4(),
      name,
      label,
      created_at: new Date(),
      updated_at: new Date(),
    } as Instrument);

    this.instruments.push(instrument);

    return instrument;
  }

  public async update(instrument: Instrument): Promise<Instrument> {
    const index = this.instruments.findIndex(x => x.id === instrument.id);

    Object.assign(this.instruments[index], {
      ...instrument,
      updated_at: new Date(),
    });

    return this.instruments[index];
  }

  public async find({
    field,
    order,
  }: IListInstrumentsDTO): Promise<Instrument[]> {
    const IF_RETURN = order === 'ASC' ? 1 : -1;
    const ELSE_RETURN = order === 'ASC' ? -1 : 1;

    return this.instruments.sort((a, b) =>
      a[field] < b[field] ? IF_RETURN : ELSE_RETURN
    );
  }

  public async findById(id: string): Promise<Instrument | undefined> {
    return this.instruments.find(instrument => instrument.id === id);
  }

  public async findByName(name: string): Promise<Instrument | undefined> {
    return this.instruments.find(
      instrument => instrument.name.toLowerCase() === name.toLowerCase()
    );
  }
}

export default FakeInstrumentsRepository;
