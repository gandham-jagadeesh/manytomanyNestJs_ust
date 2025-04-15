import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  username: string;

  groupIds:Number[];
  InterestIds:Number[];

  // Add other necessary fields
}