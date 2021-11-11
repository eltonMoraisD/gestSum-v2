import {
  Column,
  JoinColumn,
  Entity,
  PrimaryGeneratedColumn,
  BeforeInsert,
  ManyToOne,
  Unique,
  ManyToMany,
  JoinTable,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Permission } from './Permission';

@Entity()
@Unique(['id'])
export class Role {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar')
  name: string;

  @Column('varchar', { unique: true })
  description: string;

  @CreateDateColumn()
  created_at: string;

  @UpdateDateColumn()
  updated_at: string;

  @ManyToMany(() => Permission)
  @JoinTable({
    name: 'permissions_roles_mapping',
    joinColumns: [{ name: 'roleId' }],
    inverseJoinColumns: [{ name: 'permissionId' }],
  })
  permission: Permission[];
}
