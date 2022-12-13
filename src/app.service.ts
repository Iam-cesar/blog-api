import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  infoAboutAPI(): object {
    return {
      name: 'blog-api',
      docomentation: '/doc',
    };
  }
}
