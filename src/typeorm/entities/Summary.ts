import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import { Lesson } from './Lesson';

@Entity()
@Unique(['id'])
export class Summary {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar')
  summaryName: string;

  @Column({ nullable: true })
  activities: string;

  @Column()
  numStudents: number;

  @Column()
  isValidate: boolean;

  @CreateDateColumn()
  created_at: string;

  @UpdateDateColumn()
  updated_at: string;

  @OneToOne(() => Lesson, lesson => lesson.summary, { onDelete: 'CASCADE' })
  @JoinColumn()
  lesson: Lesson;
}
