import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { EditionDiscipline } from './EditionDiscipline';

@Entity()
@Unique(['id'])
export class Discipline {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar')
  code: string;

  @Column('varchar')
  name: string;

  @Column('varchar')
  sinopse: string;

  @OneToMany(() => EditionDiscipline, ediDic => ediDic.disciplines, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  editionDiscipline: EditionDiscipline;
}
