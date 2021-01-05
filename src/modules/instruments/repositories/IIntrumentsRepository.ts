import Instrument from '@modules/instruments/infra/typeorm/entities/Instrument';

import ICreateInstrumentDTO from '@modules/instruments/dtos/ICreateInstrumentDTO';
import IListInstrumentsDTO from '@modules/instruments/dtos/IListInstrumentsDTO';

export const INSTRUMENTS_REPOSITORY_INDENTIFIER = 'InstrumentsRepository';

export default interface IInstrumentsRepository {
  create(data: ICreateInstrumentDTO): Promise<Instrument>;
  update(data: Instrument): Promise<Instrument>;
  find(data: IListInstrumentsDTO): Promise<Instrument[]>;
  findById(id: string): Promise<Instrument | undefined>;
  findByName(name: string): Promise<Instrument | undefined>;
}
