import { BadRequestException, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { db } from '../prisma/utils/db.server';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ProfileEntity } from './entities/profile.entity';

@Injectable()
export class ProfileService {
  async create(data: CreateProfileDto): Promise<ProfileEntity> {
    try {
      return await db.profile.create({
        data,
        select: {
          id: true,
        },
      });
    } catch (error) {
      new BadRequestException(error?.meta?.message);
    }
  }

  async findOne(
    where: Prisma.ProfileWhereUniqueInput,
  ): Promise<ProfileEntity | null> {
    try {
      return await db.profile.findUnique({ where });
    } catch (error) {
      new BadRequestException(error?.meta?.message);
    }
  }

  async update(params: {
    where: Prisma.ProfileWhereUniqueInput;
    data: UpdateProfileDto;
  }): Promise<ProfileEntity> {
    try {
      const { where, data } = params;
      return await db.profile.update({
        where,
        data,
        select: { id: true },
      });
    } catch (error) {
      new BadRequestException(error?.meta?.message);
    }
  }

  async remove(where: Prisma.ProfileWhereUniqueInput): Promise<ProfileEntity> {
    try {
      return await db.profile.delete({ where, select: { id: true } });
    } catch (error) {
      new BadRequestException(error?.meta?.message);
    }
  }
}
