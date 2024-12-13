/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { FollowService } from './follow.service';
import { getModelToken } from '@nestjs/sequelize';
import { Follow } from './entities/follow.entity';
import { User } from 'src/user/entities/user.entity';

describe('FollowService', () => {
  let service: FollowService;
  let mockFollowModel: typeof Follow;
  let mockUserModel: typeof User;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FollowService,
        {
          provide: getModelToken(Follow),
          useValue: {
            create: jest.fn(),
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

    service = module.get<FollowService>(FollowService);
    mockFollowModel = module.get<typeof Follow>(getModelToken(Follow));
    mockUserModel = module.get<typeof User>(getModelToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('followUser', () => {
    it('should create a follow relationship', async () => {
      const followerId = 1;
      const followingId = 2;
      jest.spyOn(mockFollowModel, 'create').mockResolvedValue({} as Follow);

      const result = await service.follow(followerId, followingId);

      expect(mockFollowModel.create).toHaveBeenCalledWith({
        followerId,
        followingId,
      });
      expect(result).toEqual({
        statusCode: 201,
        massage: 'User followed successfully',
        data: true,
      });
    });
  });

  describe('unfollowUser', () => {
    it('should delete a follow relationship', async () => {
      const followerId = 1;
      const followingId = 2;
      jest.spyOn(mockFollowModel, 'destroy').mockResolvedValue(1);

      const result = await service.unfollow(followerId, followingId);

      expect(mockFollowModel.destroy).toHaveBeenCalledWith({
        where: { followerId, followingId },
      });
      expect(result).toEqual({
        statusCode: 200,
        massege: 'User unfollowed successfully',
        data: true,
      });
    });
  });

  describe('getFollowers', () => {
    it('should return a list of followers', async () => {
      const userId = 1;
      const followers = [{ id: 2, name: 'Follower' }] as User[];
      jest.spyOn(mockUserModel, 'findByPk').mockResolvedValue({
        followers,
      } as any);

      const result = await service.getFollowers(userId);

      expect(mockUserModel.findByPk).toHaveBeenCalledWith(userId, {
        include: [{ model: User, as: 'followers' }],
      });
      expect(result).toEqual({
        statusCode: 200,
        massege: 'Followers retrieved successfully',
        followers,
      });
    });

    it('should throw NotFoundException if user is not found', async () => {
      const userId = 1;
      jest.spyOn(mockUserModel, 'findByPk').mockResolvedValue(null);

      await expect(service.getFollowers(userId)).rejects.toThrow(
        'User not found',
      );
    });
  });

  describe('getFollowing', () => {
    it('should return a list of following users', async () => {
      const userId = 1;
      const following = [{ id: 2, name: 'Following' }] as User[];
      jest.spyOn(mockUserModel, 'findByPk').mockResolvedValue({
        following,
      } as any);

      const result = await service.getFollowing(userId);

      expect(mockUserModel.findByPk).toHaveBeenCalledWith(userId, {
        include: [{ model: User, as: 'following' }],
      });
      expect(result).toEqual({
        statusCode: 200,
        massege: 'Following retrieved successfully',
        following,
      });
    });

    it('should throw NotFoundException if user is not found', async () => {
      const userId = 1;
      jest.spyOn(mockUserModel, 'findByPk').mockResolvedValue(null);

      await expect(service.getFollowing(userId)).rejects.toThrow(
        'User not found',
      );
    });
  });
});
