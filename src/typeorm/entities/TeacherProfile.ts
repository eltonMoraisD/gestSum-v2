import {
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
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

  @CreateDateColumn()
  created_at: string;

  @UpdateDateColumn()
  updated_at: string;

  @OneToOne(() => User, user => user.teacherProfile, { onDelete: 'CASCADE' })
  user: User;
}