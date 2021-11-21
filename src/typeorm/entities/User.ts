import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';
import {
  OneToMany,
  Column,
  JoinColumn,
  JoinTable,
  Entity,
  PrimaryGeneratedColumn,
  BeforeInsert,
  Unique,
  ManyToMany,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
} from 'typeorm';

import { Role } from './Role';
import { TeacherProfile } from './TeacherProfile';

@Entity()
@Unique(['id'])
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar')
  name: string;

  @Column('varchar', { unique: true })
  email: string;

  @Column('varchar', { select: false })
  password: string;

  @CreateDateColumn()
  created_at: string;

  @UpdateDateColumn()
  updated_at: string;

  generateUUID(): void {
    this.id = uuidv4();
  }

  hashPassword() {
    this.password = bcrypt.hashSync(this.password, 8);
  }
  // ------------------------------------//
  //relacionamento many to many
  @ManyToMany(() => Role)
  @JoinTable({
    name: 'users_role_mapping',
    joinColumns: [{ name: 'userId' }],
    inverseJoinColumns: [{ name: 'roleId' }],
  })
  roles: Role[];
  // ------------------------------------//

  //relacionamento on-to-one com teacher profile
  @OneToOne(() => TeacherProfile, teacherProfile => teacherProfile.user, {
    //eager: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  teacherProfile: TeacherProfile;

  checkIfPasswordMatch(unencryptedPassword: string): boolean {
    return bcrypt.compareSync(unencryptedPassword, this.password);
  }
}
