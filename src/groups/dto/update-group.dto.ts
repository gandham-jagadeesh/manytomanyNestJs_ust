import { PartialType } from '@nestjs/mapped-types';
import { CreateGroupDto } from './create-group.dto';
import { IsOptional, IsArray, IsNumber } from 'class-validator';

export class UpdateGroupDto extends PartialType(CreateGroupDto) {
  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  userIds?: number[];
}