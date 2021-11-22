import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { Discipline } from './Discipline';
import { TeacherProfile } from './TeacherProfile';

@Entity()
@Unique(['id'])
export class EditionDiscipline {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar')
  numEdi: string;

  @Column('varchar')
  estado: string;

  @Column('varchar')
  anoLetivo: string;

  @Column('varchar')
  semestre: string;

  @ManyToOne(
    () => TeacherProfile,
    teacherProfile => teacherProfile.editionDisciplines,
  )
  @JoinColumn()
  teacher: TeacherProfile;

  @ManyToOne(() => Discipline, ediDisc => ediDisc.editionDiscipline, {
    //eager: true,
  })
  @JoinColumn()
  // disciplines: Discipline[];
  disciplines: Discipline[] | Discipline;
}
