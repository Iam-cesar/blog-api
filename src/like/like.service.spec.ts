import { Test, TestingModule } from '@nestjs/testing';
import { LikeEntity } from './entities/like.entity';
import { LikeService } from './like.service';
import {
  MOCK_CREATE_LIKE,
  MOCK_FIND_ONE_LIKE_RESPONSE,
} from './mock/likeService.mock';

describe('LikeService', () => {
  let likeService: LikeService;

  const MOCK_ID = '1';
  const likeServiceMock = {
    create: jest.fn().mockReturnValue({ id: MOCK_ID }),
    findOne: jest
      .fn()
      .mockReturnValue(new LikeEntity(MOCK_FIND_ONE_LIKE_RESPONSE)),
    remove: jest.fn().mockReturnValue({ id: MOCK_ID }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: LikeService,
          useValue: likeServiceMock,
        },
      ],
    }).compile();

    likeService = module.get<LikeService>(LikeService);
  });

  it('should be defined', () => {
    expect(likeService).toBeDefined();
  });

  describe('CREATE', () => {
    it('should be able to create a like', async () => {
      const like = await likeService.create(MOCK_CREATE_LIKE);
      expect(like).toStrictEqual({ id: MOCK_ID });
    });
    it('should to throw an exception', () => {
      likeServiceMock.create.mockResolvedValueOnce(new Error());
      expect(
        likeService.create({ user: { connect: { id: MOCK_ID } } }),
      ).resolves.toThrowError();
    });
  });
  describe('FIND_ONE', () => {
    it('should be able to find one like', async () => {
      const like = await likeService.findOne({ id: MOCK_ID });
      expect(like).toStrictEqual(new LikeEntity(MOCK_FIND_ONE_LIKE_RESPONSE));
    });
    it('should to throw an exception', () => {
      likeServiceMock.findOne.mockResolvedValueOnce(new Error());
      expect(likeService.findOne({ id: MOCK_ID })).resolves.toThrowError();
    });
  });
  describe('REMOVE', () => {
    it('should be able to find one like', async () => {
      const like = await likeService.remove({ id: MOCK_ID });
      expect(like).toStrictEqual({ id: MOCK_ID });
    });
    it('should to throw an exception', () => {
      likeServiceMock.remove.mockResolvedValueOnce(new Error());
      expect(likeService.remove({ id: MOCK_ID })).resolves.toThrowError();
    });
  });
});
