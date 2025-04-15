import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity('groups')
export class Group {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  // Other group properties like description, etc.

  @ManyToMany(() => User, user => user.groups)
  users: User[];
}