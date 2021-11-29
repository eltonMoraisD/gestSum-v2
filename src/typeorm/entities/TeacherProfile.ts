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
import { User } from './User';

@Entity()
@Unique(['id'])
export class TeacherProfile {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar')
  sigla: string;

  @Column('varchar')
  name: string;

  @Column('varchar')
  ocupation: string;

  @Column('varchar')
  degree: string;

  @CreateDateColumn({ select: false })
  created_at: string;

  @UpdateDateColumn({ select: false })
  updated_at: string;

  @OneToOne(() => User, user => user.teacherProfile, { onDelete: 'CASCADE' })
  user: User;

  @OneToMany(() => EditionDiscipline, ediDisc => ediDisc.teacher)
  @JoinColumn()
  editionDisciplines: EditionDiscipline[];
}
