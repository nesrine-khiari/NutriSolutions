import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RecipeEntity } from 'src/recipe/recipe-entity';
import { UserService } from '../user.service';
import { Nutritionist } from './nutritionist.entity';
import { CreateNutritionistDto } from './dtos/create-nutritionist.dto';
import { UpdateNutritionistDto } from './dtos/update-nutritionist.dto';
import { UserEntity } from '../user.entity';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { ReservedSlot } from 'src/planning/reserved-slot.entity';
import { Client } from '../client/client.entity';
import { ClientService } from '../client/client.service';
import { NutritionistStatusEnum } from 'src/enums/user-enums';
import { EmailService } from 'src/common/email/email.service';

@Injectable()
export class NutritionistService extends UserService {
  constructor(
    @InjectRepository(Nutritionist)
    protected readonly nutritionistRepository: Repository<Nutritionist>,
    @InjectRepository(ReservedSlot)
    protected readonly reservedSlotRepository: Repository<ReservedSlot>,
    protected readonly clientService: ClientService,
    protected readonly emailService: EmailService,
  ) {
    super(nutritionistRepository);
  }
  async findAll(): Promise<Nutritionist[]> {
    return this.nutritionistRepository.find();
  }

  async findOne(id: string): Promise<Nutritionist> {
    const user = await this.nutritionistRepository.findOne({
      where: { id },
      relations: ['reservedSlots'],
    });
    if (!user) {
      throw new NotFoundException(
        `User with ID ${JSON.stringify(id)} not found`,
      );
    }
    return user;
  }
  async update(
    id: string,
    updateNutritionistDto: UpdateNutritionistDto,
  ): Promise<Nutritionist> {
    const user = await this.findOne(id); // Ensure client exists
    Object.assign(user, updateNutritionistDto); // Merge updates
    const result = this.userRepository.save(user);
    if (updateNutritionistDto.status == NutritionistStatusEnum.APPROVED) {
      this.emailService.sendNutritionistApproval(user.email, user.name);
    } else this.emailService.sendNutritionistRejection(user.email, user.name);
    return result;
  }
  async getBestNutritionists(): Promise<Nutritionist[]> {
    return this.nutritionistRepository
      .createQueryBuilder('nutritionist')
      .where('nutritionist.stars >= :stars', { stars: 4 })
      .orderBy('nutritionist.stars', 'DESC')
      .take(4)
      .getMany();
  }
  async getPatientsByNutritionist(nutritionistId: string): Promise<any[]> {
    const reservedSlots = await this.reservedSlotRepository.find({
      where: { nutritionist: { id: nutritionistId } },
      relations: ['client'],
    });
    const patients = reservedSlots.map((reservedSlot) => reservedSlot.client);

    // Extract unique clients
    // const patients = reservedSlots.map((slot) => slot.client);
    return Array.from(new Set(patients.map((p) => p.id))).map((id) =>
      patients.find((p) => p.id === id),
    );
  }
  // Create a new client
  // async create(
  //   createNutritionistDto: CreateNutritionistDto,
  // ): Promise<Nutritionist> {
  //   const newNutritionist = this.nutritionistRepository.create(
  //     createNutritionistDto,
  //   );
  //   return this.nutritionistRepository.save(newNutritionist);
  // }

  // Update an existing client
  // async update(
  //   id: string,
  //   updateNutritionistDto: UpdateNutritionistDto,
  // ): Promise<Nutritionist> {
  //   const nutritionist = await this.nutritionistRepository.findOne({
  //     where: { id },
  //   }); // Ensure client exists
  //   Object.assign(nutritionist, updateNutritionistDto); // Merge updates
  //   return this.nutritionistRepository.save(nutritionist);
  // }
}
