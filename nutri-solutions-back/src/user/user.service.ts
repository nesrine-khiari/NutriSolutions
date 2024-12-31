import { Injectable, NotFoundException } from '@nestjs/common';
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
    if (createDto.password) {
      // Hash the password before saving
      const salt = await bcrypt.genSalt();
      createDto.password = await bcrypt.hash(createDto.password, salt);
    }

    const newEntity = this.userRepository.create(createDto);
    return this.userRepository.save(newEntity);
  }
  async update(id: string, updateUserDto: UpdateUserDto): Promise<UserEntity> {
    const user = await this.findOne(id); // Ensure client exists
    Object.assign(user, updateUserDto); // Merge updates
    return this.userRepository.save(user);
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
