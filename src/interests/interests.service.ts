import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { Interest } from './entities/interest.entity';
import { CreateInterestDto } from './dto/create-interest.dto';
import { UpdateInterestDto } from './dto/update-interest.dto';
import { User } from '../users/entities/user.entity';

@Injectable()
export class InterestsService {
  constructor(
    @InjectRepository(Interest)
    private readonly interestsRepository: Repository<Interest>,
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async create(createInterestDto: CreateInterestDto): Promise<Interest> {
    const interest = this.interestsRepository.create(createInterestDto);

    if (createInterestDto.userIds && createInterestDto.userIds.length > 0) {
      const users = await this.usersRepository.findBy({
        id: In(createInterestDto.userIds),
      });
      interest.users = users;
    }

    return this.interestsRepository.save(interest);
  }

  async findAll(): Promise<Interest[]> {
    return this.interestsRepository.find({ relations: ['users'] });
  }

  async findOne(id: number): Promise<Interest> {
    const interest = await this.interestsRepository.findOne({
      where: { id },
      relations: ['users'],
    });

    if (!interest) {
      throw new NotFoundException(`Interest with ID ${id} not found`);
    }

    return interest;
  }

  async update(id: number, updateInterestDto: UpdateInterestDto): Promise<Interest> {
    const interest = await this.findOne(id);

    this.interestsRepository.merge(interest, updateInterestDto);

    if (updateInterestDto.userIds && updateInterestDto.userIds.length > 0) {
      const users = await this.usersRepository.findBy({
        id: In(updateInterestDto.userIds),
      });
      interest.users = users;
    }

    return this.interestsRepository.save(interest);
  }

  async remove(id: number): Promise<void> {
    const result = await this.interestsRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Interest with ID ${id} not found`);
    }
  }
}
