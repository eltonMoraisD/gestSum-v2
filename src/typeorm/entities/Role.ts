import {
  Column,
  JoinColumn,
  Entity,
  PrimaryGeneratedColumn,
  BeforeInsert,
  ManyToOne,
  Unique
} from 'typeorm';
import { User } from './User';

@Entity()
@Unique(['id'])
export class Role {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar')
  name: string;

  @Column('varchar', { unique: true })
  description: string;
}
