import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './database/typeorm.config';
import { UsersModule } from './users/users.module';
import { GroupsModule } from './groups/groups.module';
import { InterestsModule } from './interests/interests.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    UsersModule,
    GroupsModule,
    InterestsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}