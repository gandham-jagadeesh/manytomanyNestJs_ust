import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity('interests')
export class Interest {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany(() => User, user => user.interests)
  users: User[];
}