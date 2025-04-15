import { Module, forwardRef } from '@nestjs/common';
import { GroupsController } from './groups.controller';
import { GroupsService } from './groups.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Group } from './entities/group.entity';
import { UsersModule } from '../users/users.module';
import { Interest } from 'src/interests/entities/interest.entity';
import { User } from 'src/users/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Group,Interest,User]),
    
  ],
  controllers: [GroupsController],
  providers: [GroupsService],
  exports: [GroupsService],
})
export class GroupsModule {}