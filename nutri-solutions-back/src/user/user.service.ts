import {
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';

export class UserService {
  constructor(
    // private readonly specificUserRepository: Repository<Entity>,
    @InjectRepository(UserEntity)
    protected readonly userRepository: Repository<UserEntity>,
  ) {}
  protected readonly logger = new Logger(UserService.name);
  async findAll(): Promise<UserEntity[]> {
    return this.userRepository.find();
  }

  async findOne(id: string): Promise<UserEntity> {
    const user = await this.userRepository.findOneBy({ id } as any);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }
  async findOneByEmail(email: string): Promise<UserEntity> {
    const user = await this.userRepository.findOneBy({ email } as any);
    if (!user) {
      throw new NotFoundException(`User with email ${email} not found`);
    }
    return user;
  }
  async create(createDto: CreateUserDto): Promise<UserEntity> {
    try {
      // Hash the password if provided
      if (createDto.password) {
        const salt = await bcrypt.genSalt();
        createDto.password = await bcrypt.hash(createDto.password, salt);
      }

      // Create a new entity from the DTO
      const newEntity = this.userRepository.create(createDto);

      // Save the entity and wait for the operation to complete
      const savedEntity = await this.userRepository.save(newEntity);

      // Return the saved entity
      return savedEntity;
    } catch (error) {
      if (
        error.message.includes('IDX_') &&
        error.message.includes('Duplicate')
      ) {
        throw new ConflictException('Email is already in use');
      }

      // Handle other types of errors
      throw new HttpException(
        error.message || 'Internal Server Error',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  async update(id: string, updateUserDto: UpdateUserDto): Promise<UserEntity> {
    const user = await this.findOne(id); // Ensure client exists
    Object.assign(user, updateUserDto); // Merge updates
    return this.userRepository.save(user);
  }

  async updatePassword(id: string, newPassword: string): Promise<UserEntity> {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    await this.userRepository.update(id, { password: hashedPassword });
    return this.findOne(id);
  }
  /**
   * Validates a user's credentials.
   * @param email - The user's email.
   * @param password - The user's password.
   * @returns The user if the credentials are valid, null otherwise.
   */
  async validateUser(
    email: string,
    password: string,
  ): Promise<UserEntity | null> {
    const user = await this.findOneByEmail(email);
    if (user && (await bcrypt.compare(password, (user as any).password))) {
      return user;
    }
    return null;
  }

  async remove(id: string): Promise<void> {
    const user = await this.findOne(id);
    await this.userRepository.remove(user);
  }
}
