import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { createdAt, updatedAt } from '../common/helpers/date.helper';
import { db } from '../prisma/utils/db.server';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ProfileEntity } from './entities/profile.entity';

@Injectable()
export class ProfileService {
  create(data: CreateProfileDto): Promise<ProfileEntity> {
    return db.profile.create({
      data: { ...data, createdAt },
      select: {
        id: true,
      },
    });
  }

  findOne(
    where: Prisma.ProfileWhereUniqueInput,
  ): Promise<ProfileEntity | null> {
    return db.profile.findUnique({ where });
  }

  update(params: {
    where: Prisma.ProfileWhereUniqueInput;
    data: UpdateProfileDto;
  }): Promise<ProfileEntity> {
    const { where, data } = params;
    return db.profile.update({
      where,
      data: { ...data, updatedAt },
      select: { id: true },
    });
  }

  remove(where: Prisma.ProfileWhereUniqueInput): Promise<ProfileEntity> {
    return db.profile.delete({ where, select: { id: true } });
  }
}
