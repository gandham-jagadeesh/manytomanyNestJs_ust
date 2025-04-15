import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm';
import { Group } from '../../groups/entities/group.entity';
import { Interest } from '../../interests/entities/interest.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  // Other user properties like email, password, etc.

  @ManyToMany(() => Group, group => group.users)
  @JoinTable({
    name: 'user_groups',
    joinColumn: { name: 'userId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'groupId', referencedColumnName: 'id' },
  })
  groups: Group[];

  @ManyToMany(() => Interest, interest => interest.users ,{cascade: true})
  @JoinTable({
    name: 'user_interests',
    joinColumn: { name: 'userId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'interestId', referencedColumnName: 'id' },
  })
  interests: Interest[];
}