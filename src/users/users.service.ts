import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Group } from '../groups/entities/group.entity';
import { Interest } from '../interests/entities/interest.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    @InjectRepository(Group)
    private readonly groupsRepository: Repository<Group>,
    @InjectRepository(Interest)
    private readonly interestsRepository: Repository<Interest>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = this.usersRepository.create(createUserDto);
    return this.usersRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return this.usersRepository.find({ relations: ['groups', 'interests'] });
  }

  async findOne(id: number): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: { id },
      relations: ['groups', 'interests'],
    });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findOne(id);
    this.usersRepository.merge(user, updateUserDto);
    return this.usersRepository.save(user);
  }

  async remove(id: number): Promise<void> {
    const result = await this.usersRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
  }

  async addUserToGroup(userId: number, groupId: number): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: { id: userId },
      relations: ['groups'],
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    const group = await this.groupsRepository.findOneBy({ id: groupId });
    if (!group) {
      throw new NotFoundException(`Group with ID ${groupId} not found`);
    }

    if (!user.groups.some(g => g.id === group.id)) {
      user.groups.push(group);
      await this.usersRepository.save(user);
    }

    return this.findOne(userId);
  }

  async removeUserFromGroup(userId: number, groupId: number): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: { id: userId },
      relations: ['groups'],
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    user.groups = user.groups.filter(g => g.id !== groupId);
    await this.usersRepository.save(user);
    return this.findOne(userId);
  }

  async addUserInterest(userId: number, interestId: number): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: { id: userId },
      relations: ['interests'],
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    const interest = await this.interestsRepository.findOneBy({ id: interestId });
    if (!interest) {
      throw new NotFoundException(`Interest with ID ${interestId} not found`);
    }

    if (!user.interests.some(i => i.id === interest.id)) {
      user.interests.push(interest);
      await this.usersRepository.save(user);
    }

    return this.findOne(userId);
  }

  async removeUserInterest(userId: number, interestId: number): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: { id: userId },
      relations: ['interests'],
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    user.interests = user.interests.filter(i => i.id !== interestId);
    await this.usersRepository.save(user);
    return this.findOne(userId);
  }
}
