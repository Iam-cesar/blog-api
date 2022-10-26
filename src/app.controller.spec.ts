import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppModule } from './app.module';
import { AppService } from './app.service';

describe('UserController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        AppModule,
        {
          provide: AppService,
          useValue: {
            infoAboutAPI: jest.fn().mockReturnValue({
              name: 'blog-api',
              docomentation: 'base_url/doc',
            }),
          },
        },
      ],
    }).compile();

    appController = module.get<AppController>(AppController);
  });

  it('should be defined', () => {
    expect(appController).toBeDefined();
  });

  it('should return name API', () => {
    const response = appController.infoAboutAPI();
    expect(response).toStrictEqual({
      name: 'blog-api',
      docomentation: 'base_url/doc',
    });
  });
});
