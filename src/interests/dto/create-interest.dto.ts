import { IsArray, IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateInterestDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsInt()
  @IsArray()
  userIds: number[];
}