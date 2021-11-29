import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import { EditionDiscipline } from './EditionDiscipline';
import { Summary } from './Summary';

@Entity()
@Unique(['id'])
export class Lesson {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  number: number;

  @Column('varchar')
  weekDay: string;

  @Column('varchar')
  date: string;

  @Column('varchar')
  local: string;

  @Column('varchar')
  duration: string;

  @CreateDateColumn({ select: false })
  created_at: string;

  @UpdateDateColumn({ select: false })
  updated_at: string;

  @OneToMany(() => EditionDiscipline, dis => dis.lesson)
  @JoinColumn()
  editionDiscipline: EditionDiscipline;

  @OneToOne(() => Summary, summary => summary.lesson, { onDelete: 'CASCADE' })
  summary: Summary;
}
