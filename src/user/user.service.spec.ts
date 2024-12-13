/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { getModelToken } from '@nestjs/sequelize';
import { User } from './entities/user.entity';
import { NotFoundException } from '@nestjs/common';

describe('UserService', () => {
  let service: UserService;
  let mockUserModel: typeof User;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getModelToken(User),
          useValue: {
            findAll: jest.fn(),
            findByPk: jest.fn(),
            findOne: jest.fn(),
            create: jest.fn(),
            update: jest.fn(),
            destroy: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    mockUserModel = module.get<typeof User>(getModelToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAllUsers', () => {
    it('should return all users', async () => {
      const users = [{ id: 1, name: 'John Doe' }] as User[];
      jest.spyOn(mockUserModel, 'findAll').mockResolvedValue(users);

      const result = await service.getAllUser();

      expect(mockUserModel.findAll).toHaveBeenCalled();
      expect(result).toEqual(users);
    });
  });

  describe('getUserById', () => {
    it('should return a user by ID', async () => {
      const userId = 1;
      const user = { id: userId, name: 'John Doe' } as User;
      jest.spyOn(mockUserModel, 'findByPk').mockResolvedValue(user);

      const result = await service.getUserById(userId);

      expect(mockUserModel.findByPk).toHaveBeenCalledWith(userId);
      expect(result).toEqual(user);
    });

    it('should throw NotFoundException if user is not found', async () => {
      const userId = 1;
      jest.spyOn(mockUserModel, 'findByPk').mockResolvedValue(null);

      await expect(service.getUserById(userId)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('getUserByEmail', () => {
    it('should return a user by email', async () => {
      const email = 'john@example.com';
      const user = { id: 1, email } as User;
      jest.spyOn(mockUserModel, 'findOne').mockResolvedValue(user);

      const result = await service.getUserByEmail(email);

      expect(mockUserModel.findOne).toHaveBeenCalledWith({ where: { email } });
      expect(result).toEqual(user);
    });

    it('should throw NotFoundException if user is not found', async () => {
      const email = 'john@example.com';
      jest.spyOn(mockUserModel, 'findOne').mockResolvedValue(null);

      await expect(service.getUserByEmail(email)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('createUser', () => {
    it('should create a new user', async () => {
      const createUserDto = {
        name: 'John Doe',
        email: 'john@example.com',
      } as User;
      const user = { id: 1, ...createUserDto } as User;
      jest.spyOn(mockUserModel, 'create').mockResolvedValue(user);

      const result = await service.create(createUserDto);

      expect(mockUserModel.create).toHaveBeenCalledWith(createUserDto);
      expect(result).toEqual(user);
    });
  });

  describe('updateUser', () => {
    it('should update a user', async () => {
      const userId = 1;
      const updateUserDto = { name: 'John Updated' };
      const user = { id: userId, name: 'John Doe' } as User;
      jest.spyOn(mockUserModel, 'findByPk').mockResolvedValue(user);
      jest.spyOn(mockUserModel, 'update').mockResolvedValue([1]);

      const result = await service.update(userId, updateUserDto);

      expect(mockUserModel.findByPk).toHaveBeenCalledWith(userId);
      expect(mockUserModel.update).toHaveBeenCalledWith(updateUserDto, {
        where: { id: userId },
      });
      expect(result).toEqual({ ...user, ...updateUserDto });
    });

    it('should throw NotFoundException if user is not found', async () => {
      const userId = 1;
      const updateUserDto = { name: 'John Updated' };
      jest.spyOn(mockUserModel, 'findByPk').mockResolvedValue(null);

      await expect(service.update(userId, updateUserDto)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('deleteUser', () => {
    it('should delete a user', async () => {
      const userId = 1;
      jest.spyOn(mockUserModel, 'destroy').mockResolvedValue(1);

      const result = await service.remove(userId);

      expect(mockUserModel.destroy).toHaveBeenCalledWith({
        where: { id: userId },
      });
      expect(result).toEqual({
        statusCode: 200,
        message: 'User deleted successfully',
      });
    });
    it('should throw NotFoundException if user is not found', async () => {
      const userId = 1;
      jest.spyOn(mockUserModel, 'destroy').mockResolvedValue(0);
      await expect(service.remove(userId)).rejects.toThrow(NotFoundException);
    });
  });
});
