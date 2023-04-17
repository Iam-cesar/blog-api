import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { db } from '../prisma/utils/db.server';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ProfileEntity } from './entities/profile.entity';

@Injectable()
export class ProfileService {
  create(data: CreateProfileDto): Promise<ProfileEntity> {
    try {
      return db.profile.create({
        data,
        select: {
          id: true,
        },
      });
    } catch (error) {
      return error;
    }
  }

  findOne(
    where: Prisma.ProfileWhereUniqueInput,
  ): Promise<ProfileEntity | null> {
    try {
      return db.profile.findUnique({ where });
    } catch (error) {
      return error;
    }
  }

  update(params: {
    where: Prisma.ProfileWhereUniqueInput;
    data: UpdateProfileDto;
  }): Promise<ProfileEntity> {
    try {
      const { where, data } = params;
      return db.profile.update({
        where,
        data,
        select: { id: true },
      });
    } catch (error) {
      return error;
    }
  }

  remove(where: Prisma.ProfileWhereUniqueInput): Promise<ProfileEntity> {
    try {
      return db.profile.delete({ where, select: { id: true } });
    } catch (error) {
      return error;
    }
  }
}
