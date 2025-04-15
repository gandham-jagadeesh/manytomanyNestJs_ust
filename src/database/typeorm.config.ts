import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { Group } from '../groups/entities/group.entity';
import { Interest } from '../interests/entities/interest.entity';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'mysql', // Or your chosen database type
  host: 'localhost',
  port: 3306, // Default MySQL port
  username: 'root',
  password: 'pass@word1',
  database: 'social_network_db',
  entities: [User, Group, Interest], // Add your entities here
  synchronize: true, // Auto-creates database schema, NOT recommended for production
  logging: true, // Optional: enables query logging, useful for debugging
};
