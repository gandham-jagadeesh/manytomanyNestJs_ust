import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { Group } from './entities/group.entity';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { User } from './../users/entities/user.entity';
@Injectable()
export class GroupsService {
  constructor(
    @InjectRepository(Group)
    private readonly groupsRepository: Repository<Group>,
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async create(createGroupDto: CreateGroupDto): Promise<Group> {
    const group = this.groupsRepository.create(createGroupDto);

    if (createGroupDto.userIds && createGroupDto.userIds.length > 0) {
      const users = await this.usersRepository.findBy({
        id: In(createGroupDto.userIds),
      });
      group.users = users;
    }

    return this.groupsRepository.save(group);
  }

  async findAll(): Promise<Group[]> {
    return this.groupsRepository.find({ relations: ['users'] });
  }

  async findOne(id: number): Promise<Group> {
    const group = await this.groupsRepository.findOne({
      where: { id },
      relations: ['users'],
    });
    if (!group) {
      throw new NotFoundException(`Group with ID ${id} not found`);
    }
    return group;
  }

  async update(id: number, updateGroupDto: UpdateGroupDto): Promise<Group> {
    const group = await this.findOne(id);
    this.groupsRepository.merge(group, updateGroupDto);

    if (updateGroupDto.userIds && updateGroupDto.userIds.length > 0) {
      const users = await this.usersRepository.findBy({
        id: In(updateGroupDto.userIds),
      });
      group.users = users;
    }

    return this.groupsRepository.save(group);
  }
  async remove(id: number): Promise<void> {
    const result = await this.groupsRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Group with ID ${id} not found`);
    }
  }

  async addUserToGroup(groupId: number, userId: number): Promise<Group> {
    const group = await this.findOne(groupId);
    const user = await this.usersRepository.findOneBy({ id: userId });
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }
    if (!group.users) {
      group.users = [];
    }
    if (!group.users.some(u => u.id === user.id)) {
      group.users.push(user);
      await this.groupsRepository.save(group);
    }
    return this.findOne(groupId); // Reload with relations
  }

  async removeUserFromGroup(groupId: number, userId: number): Promise<Group> {
    const group = await this.findOne(groupId);
    group.users = group.users?.filter(u => u.id !== userId) || [];
    await this.groupsRepository.save(group);
    return this.findOne(groupId); // Reload with relations
  }
}