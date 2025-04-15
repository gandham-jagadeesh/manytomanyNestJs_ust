import { Module } from '@nestjs/common';
import { InterestsController } from './interests.controller';
import { InterestsService } from './interests.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Interest } from './entities/interest.entity';
import { Group } from 'src/groups/entities/group.entity';
import { User } from 'src/users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Interest,Group,User])],
  controllers: [InterestsController],
  providers: [InterestsService],
  exports: [InterestsService], // Export if other modules need it
})
export class InterestsModule {}