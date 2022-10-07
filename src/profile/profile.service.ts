import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { createdAt, updatedAt } from './../app.helper';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ProfileEntity } from './entities/profile.entity';

@Injectable()
export class ProfileService {
  constructor(private prisma: PrismaService) {}

  create(data: CreateProfileDto): Promise<ProfileEntity> {
    return this.prisma.profile.create({
      data: { ...data, createdAt },
    });
  }

  findOne(
    where: Prisma.ProfileWhereUniqueInput,
  ): Promise<ProfileEntity | null> {
    return this.prisma.profile.findUnique({ where });
  }

  update(params: {
    where: Prisma.ProfileWhereUniqueInput;
    data: UpdateProfileDto;
  }): Promise<ProfileEntity> {
    const { where, data } = params;
    return this.prisma.profile.update({
      where,
      data: { ...data, updatedAt },
      select: { id: true },
    });
  }

  remove(where: Prisma.ProfileWhereUniqueInput): Promise<ProfileEntity> {
    return this.prisma.profile.delete({ where, select: { id: true } });
  }
}
