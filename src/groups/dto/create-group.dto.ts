//import { IsNotEmpty, IsString } from 'class-validator';
import { IsNotEmpty, IsString, IsOptional, IsArray, IsNumber } from 'class-validator';
export class CreateGroupDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  // Add other necessary fields
  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  userIds?: number[];
}