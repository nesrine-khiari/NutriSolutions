import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RecipeEntity } from 'src/recipe/recipe-entity';
import { UserService } from '../user.service';
import { Nutritionist } from './nutritionist.entity';
import { CreateNutritionistDto } from './dtos/create-nutritionist.dto';
import { UpdateNutritionistDto } from './dtos/update-nutritionist.dto';
import { UserEntity } from '../user.entity';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { ReservedSlot } from 'src/planning/reserved-slot/reserved-slot.entity';
import { Client } from '../client/client.entity';
import { ClientService } from '../client/client.service';
import { ExperienceEnum, NutritionistStatusEnum } from 'src/enums/user-enums';
import { EmailService } from 'src/common/email/email.service';
import { Cron } from '@nestjs/schedule';

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
    // this.startIncrementInterval();
  }
  // private startIncrementInterval() {
  //   const oneYearInMilliseconds = 365 * 24 * 60 * 60 * 1000; // 1 year in milliseconds
  //   setInterval(async () => {
  //     try {
  //       await this.nutritionistRepository.increment({}, 'experienceYears', 1);
  //       this.logger.log('Experience incremented');
  //     } catch (error) {
  //       this.logger.error('Failed to increment experience', error.stack);
  //     }
  //   }, oneYearInMilliseconds); // 60,000 milliseconds = 1 minute
  // }
  @Cron('*/1 * * * *')
  async incrementExperience() {
    try {
      await this.nutritionistRepository.increment({}, 'experienceYears', 1);
      this.logger.log('Experience incremented for all nutritionists.');
    } catch (error) {
      this.logger.error('Failed to increment experience', error.stack);
    }
  }
  async findAllNutritionists(
    page: number = 1,
    limit: number = 12,
    searchText?: string,
    experience?: ExperienceEnum,
    status?: NutritionistStatusEnum,
  ): Promise<{
    data: Nutritionist[];
    total: number;
  }> {
    const queryBuilder =
      this.nutritionistRepository.createQueryBuilder('nutritionist');

    if (searchText?.trim()) {
      const formattedSearch = `%${searchText.trim()}%`;
      queryBuilder.andWhere(
        'LOWER(nutritionist.name) LIKE LOWER(:searchText)',
        {
          searchText: formattedSearch,
        },
      );
    }
    if (status) {
      queryBuilder.andWhere('nutritionist.status = :status', {
        status: status,
      });
    }

    switch (experience) {
      case ExperienceEnum.JUNIOR:
        queryBuilder.andWhere('nutritionist.experienceYears < 4');
        this.logger.debug('JUNIOR');
        break;
      case ExperienceEnum.MID_LEVEL:
        queryBuilder.andWhere(
          'nutritionist.experienceYears >= 4 AND nutritionist.experienceYears < 7',
        );
        this.logger.debug('MID LEVEL');

        break;
      case ExperienceEnum.SENIOR:
        queryBuilder.andWhere(
          'nutritionist.experienceYears >= 7 AND nutritionist.experienceYears < 11',
        );
        this.logger.debug('SENIOR LEVEL');

        break;
      case ExperienceEnum.SENIOR_PLUS:
        queryBuilder.andWhere('nutritionist.experienceYears >= 11');
        this.logger.debug('SENIOR PLUS LEVEL');

        break;
      default:
        this.logger.debug('no match');

        break;
    }

    queryBuilder.skip((page - 1) * limit).take(limit);

    // Get results and total count
    const [data, total] = await queryBuilder.getManyAndCount();

    return { data, total };
  }

  async findOne(id: string): Promise<Nutritionist> {
    const user = await this.nutritionistRepository.findOne({
      where: { id },
      relations: ['unavailableSlots'],
    });
    if (!user) {
      throw new NotFoundException(
        `User with ID ${JSON.stringify(id)} not found`,
      );
    }
    return user;
  }
  async countNutritionists(): Promise<{ total: number }> {
    const total = await this.nutritionistRepository.count();
    return { total };
  }
  async findAllApprovedNutritionists(
    page: number,
    limit: number,
    searchText?: string,
    experience?: ExperienceEnum,
  ): Promise<{ data: Nutritionist[]; total: number }> {
    const [data, total] = await this.nutritionistRepository.findAndCount({
      where: { status: NutritionistStatusEnum.APPROVED },
      take: limit,
      skip: (page - 1) * limit,
    });

    return { data, total };
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
      .where('nutritionist.status = :status', {
        status: NutritionistStatusEnum.APPROVED,
      })
      .orderBy('nutritionist.rating', 'DESC')
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
  async getClientsCount(nutritionistId: string): Promise<number> {
    const clients = await this.getPatientsByNutritionist(nutritionistId);
    return clients.length;
  }
}
