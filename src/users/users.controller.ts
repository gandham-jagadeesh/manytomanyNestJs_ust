import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }

  @Post(':userId/groups/:groupId')
  addUserToGroup(@Param('userId') userId: string, @Param('groupId') groupId: string) {
    console.log('userId:', userId, 'groupId:', groupId);
    return this.usersService.addUserToGroup(+userId, +groupId);
  }

  @Delete(':userId/groups/:groupId')
  removeUserFromGroup(@Param('userId') userId: string, @Param('groupId') groupId: string) {
    return this.usersService.removeUserFromGroup(+userId, +groupId);
  }

  @Post(':userId/interests/:interestId')
  addUserInterest(@Param('userId') userId: string, @Param('interestId') interestId: string) {

    return this.usersService.addUserInterest(+userId, +interestId);
  }

  @Delete(':userId/interests/:interestId')
  removeUserInterest(@Param('userId') userId: string, @Param('interestId') interestId: string) {
    return this.usersService.removeUserInterest(+userId, +interestId);
  }
}

