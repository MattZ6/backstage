import { getRepository, Repository } from 'typeorm';

import Instrument from '@modules/instruments/infra/typeorm/entities/Instrument';

import ICreateInstrumentDTO from '@modules/instruments/dtos/ICreateInstrumentDTO';
import IListInstrumentsDTO from '@modules/instruments/dtos/IFindInstrumentsDTO';
import IInstrumentsRepository from '@modules/instruments/repositories/IIntrumentsRepository';

class InstrumentsRepository implements IInstrumentsRepository {
  private repository: Repository<Instrument>;

  constructor() {
    this.repository = getRepository(Instrument);
  }

  public async create({
    name,
    label,
  }: ICreateInstrumentDTO): Promise<Instrument> {
    const instrument = this.repository.create({
      name,
      label,
    });

    return this.repository.save(instrument);
  }

  public async update(instrument: Instrument): Promise<Instrument> {
    return this.repository.save(instrument);
  }

  public async findById(id: string): Promise<Instrument | undefined> {
    return this.repository.findOne({
      where: { id },
    });
  }

  public async findByName(name: string): Promise<Instrument | undefined> {
    return this.repository
      .createQueryBuilder('instrument')
      .where(`LOWER(instrument.name) = LOWER('${name}')`)
      .getOne();
  }

  public async find({
    field,
    order,
  }: IListInstrumentsDTO): Promise<Instrument[]> {
    return this.repository.find({
      order: {
        [field]: order,
      },
    });
  }
}

export default InstrumentsRepository;
