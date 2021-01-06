import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

export const MUSIC_SYLES_TABLE_NAME = 'music_styles';

@Entity(MUSIC_SYLES_TABLE_NAME)
class MusicStyle {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default MusicStyle;
