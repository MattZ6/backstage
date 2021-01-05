import { Connection } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';

import Instrument from '@modules/instruments/infra/typeorm/entities/Instrument';

class CreateInstrumentsSeeder implements Seeder {
  public async run(_: Factory, connection: Connection): Promise<void> {
    const query = connection
      .createQueryBuilder()
      .from(Instrument, 'instrument');

    const count = await query.getCount();

    if (count) {
      console.log(`
        -----------------------------------
        --- Instrumentos já cadastrados ---
        -----------------------------------
      `);

      return;
    }

    await query
      .insert()
      .values([
        {
          name: 'Guitarra',
          label: 'guitarrista',
        },
        {
          name: 'Bateria',
          label: 'baterista',
        },
        {
          name: 'Contrabaixo',
          label: 'baixista',
        },
        {
          name: 'Contrabaixo acústico',
          label: 'baixista',
        },
        {
          name: 'Violão',
          label: 'violonista',
        },
        {
          name: 'Vocal',
          label: 'vocalista',
        },
        {
          name: 'Teclado',
          label: 'tecladista',
        },
        {
          name: 'Percussão',
          label: 'percussionista',
        },
        {
          name: 'Saxofone',
          label: 'saxofonista',
        },
      ])
      .execute();
  }
}

export default CreateInstrumentsSeeder;
