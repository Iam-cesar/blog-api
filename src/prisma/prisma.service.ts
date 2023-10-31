import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { db } from './utils/db.server';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await db.$connect();
  }

  async enableShutDownHooks(app: INestApplication) {
    db.$on('beforeExit' as never, async () => {
      await app.close();
    });
  }
}
