import { Connection } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';

import MusicStyle from '@modules/music_styles/infra/typeorm/entities/MusicStyle';

class CreateInstrumentsSeeder implements Seeder {
  public async run(_: Factory, connection: Connection): Promise<void> {
    const query = connection
      .createQueryBuilder()
      .from(MusicStyle, 'musicStyle');

    const count = await query.getCount();

    if (count) {
      // eslint-disable-next-line no-console
      console.log(`
        ---------------------------------------
        --- Estilos musicais já cadastrados ---
        ---------------------------------------
      `);

      return;
    }

    await query
      .insert()
      .values([
        {
          name: "Rock'n roll",
        },
        {
          name: 'Heavy Metal',
        },
        {
          name: 'Country',
        },
        {
          name: 'Death Metal',
        },
        {
          name: 'Grunge',
        },
        {
          name: 'Hardcore',
        },
        {
          name: 'Hard Rock',
        },
        {
          name: 'Indie',
        },
        {
          name: 'Metal',
        },
        {
          name: 'Metalcore',
        },
        {
          name: 'Power Metal',
        },
        {
          name: 'Punk Rock',
        },
        {
          name: 'Progressive Metal',
        },
        {
          name: 'Rock',
        },
        {
          name: 'Classic Rock',
        },
        {
          name: 'Progressive Rock',
        },
        {
          name: 'Alternative Rock',
        },
      ])
      .execute();
  }
}

export default CreateInstrumentsSeeder;
