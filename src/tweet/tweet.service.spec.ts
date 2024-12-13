/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { TweetService } from './tweet.service';
import { getModelToken } from '@nestjs/sequelize';
import { NotFoundException } from '@nestjs/common';
import { Tweet } from './entities/tweet.entity';
import { User } from 'src/user/entities/user.entity';

describe('TweetService', () => {
  let service: TweetService;
  let mockTweetModel: typeof Tweet;
  let mockUserModel: typeof User;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TweetService,
        {
          provide: getModelToken(Tweet),
          useValue: {
            findAll: jest.fn(),
            findByPk: jest.fn(),
            create: jest.fn(),
            update: jest.fn(),
            destroy: jest.fn(),
          },
        },
        {
          provide: getModelToken(User),
          useValue: {
            findByPk: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<TweetService>(TweetService);
    mockTweetModel = module.get<typeof Tweet>(getModelToken(Tweet));
    mockUserModel = module.get<typeof User>(getModelToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAllTweets', () => {
    it('should return all tweets', async () => {
      const tweets = [{ id: 1, content: 'Hello World' }] as Tweet[];
      jest.spyOn(mockTweetModel, 'findAll').mockResolvedValue(tweets);

      const result = await service.getAllTweet();

      expect(mockTweetModel.findAll).toHaveBeenCalled();
      expect(result).toEqual(tweets);
    });
  });

  describe('getTweetById', () => {
    it('should return a tweet by ID', async () => {
      const tweetId = 1;
      const tweet = { id: tweetId, content: 'Hello World' } as Tweet;
      jest.spyOn(mockTweetModel, 'findByPk').mockResolvedValue(tweet);

      const result = await service.getTweetById(tweetId);

      expect(mockTweetModel.findByPk).toHaveBeenCalledWith(tweetId, { include: [User] });
      expect(result).toEqual(tweet);
    });

    it('should throw NotFoundException if tweet is not found', async () => {
      const tweetId = 1;
      jest.spyOn(mockTweetModel, 'findByPk').mockResolvedValue(null);

      await expect(service.getTweetById(tweetId)).rejects.toThrow(NotFoundException);
    });
  });

  describe('createTweet', () => {
    it('should create a new tweet', async () => {
      const createTweetDto = { content: 'Hello World', userId: 1 } as Tweet;
      const tweet = { id: 1, ...createTweetDto } as Tweet;
      jest.spyOn(mockTweetModel, 'create').mockResolvedValue(tweet);
      jest.spyOn(mockUserModel, 'findByPk').mockResolvedValue({ id: createTweetDto.userId } as User);

      const result = await service.create(createTweetDto);

      expect(mockUserModel.findByPk).toHaveBeenCalledWith(createTweetDto.userId);
      expect(mockTweetModel.create).toHaveBeenCalledWith(createTweetDto);
      expect(result).toEqual(tweet);
    });

    it('should throw NotFoundException if user is not found', async () => {
      const createTweetDto = { content: 'Hello World', userId: 1 } as Tweet;
      jest.spyOn(mockUserModel, 'findByPk').mockResolvedValue(null);

      await expect(service.create(createTweetDto)).rejects.toThrow(NotFoundException);
    });
  });

  describe('updateTweet', () => {
    it('should update a tweet', async () => {
      const tweetId = 1;
      const updateTweetDto = { content: 'Updated Tweet' };
      const tweet = { id: tweetId, content: 'Hello World', userId: 1 } as Tweet;
      jest.spyOn(mockTweetModel, 'findByPk').mockResolvedValue(tweet);
      jest.spyOn(mockTweetModel, 'update').mockResolvedValue([1]);

      const result = await service.update(tweetId, updateTweetDto);

      expect(mockTweetModel.findByPk).toHaveBeenCalledWith(tweetId);
      expect(mockTweetModel.update).toHaveBeenCalledWith(updateTweetDto, { where: { id: tweetId } });
      expect(result).toEqual({ ...tweet, ...updateTweetDto });
    });

    it('should throw NotFoundException if tweet is not found', async () => {
      const tweetId = 1;
      const updateTweetDto = { content: 'Updated Tweet' };
      jest.spyOn(mockTweetModel, 'findByPk').mockResolvedValue(null);

      await expect(service.update(tweetId, updateTweetDto)).rejects.toThrow(NotFoundException);
    });
  });

  describe('deleteTweet', () => {
    it('should delete a tweet', async () => {
      const tweetId = 1;
      jest.spyOn(mockTweetModel, 'destroy').mockResolvedValue(1);

      const result = await service.removeTweet(tweetId);

      expect(mockTweetModel.destroy).toHaveBeenCalledWith({ where: { id: tweetId } });
      expect(result).toEqual({ statusCode: 200, message: 'Tweet deleted successfully' });
    });

    it('should throw NotFoundException if tweet is not found', async () => {
      const tweetId = 1;
      jest.spyOn(mockTweetModel, 'destroy').mockResolvedValue(0);

      await expect(service.removeTweet(tweetId)).rejects.toThrow(NotFoundException);
    });
  });
});
