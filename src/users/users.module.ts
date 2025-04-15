import { Module, forwardRef } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { GroupsModule } from '../groups/groups.module';
import { InterestsModule } from '../interests/interests.module';
import { Group } from 'src/groups/entities/group.entity';
import { Interest } from 'src/interests/entities/interest.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User,Group,Interest]),
    
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}