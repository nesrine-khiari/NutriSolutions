import { TimeStampEntity } from 'src/common/db-utilities/time-stamp.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  TableInheritance,
  ManyToMany,
  JoinTable,
  ChildEntity,
} from 'typeorm';
import { UserEntity } from '../user.entity';
import { NutritionistStatusEnum } from 'src/enums/user-enums';

@ChildEntity()
export class Nutritionist extends UserEntity {
  @Column()
  experienceYears: number;
  @Column()
  certificateUrl: string;
  @Column()
  location: string;

  @Column({
    type: 'enum',
    enum: NutritionistStatusEnum,
    default: NutritionistStatusEnum.WAITING,
  })
  status: NutritionistStatusEnum;
}
