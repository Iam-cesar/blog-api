import { IsEmpty, IsIn, IsOptional, Length } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';

const permitions = ['create', 'read', 'update', 'delete'];
export class CreateRoleDto {
  @ApiProperty()
  @Length(4, 64)
  name: string;

  @IsOptional()
  @IsIn(permitions, { each: true })
  permitions: string[];

  @IsOptional()
  user?: Prisma.UserCreateNestedOneWithoutProfileInput;

  @IsEmpty()
  createdAt?: string | Date;

  @IsEmpty()
  updatedAt?: string | Date;
}
