import { TimeStampEntity } from 'src/common/db-utilities/time-stamp.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  TableInheritance,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { UserEntity } from '../user.entity';
import { NutritionistStatusEnum } from 'src/enums/user-enums';

@Entity()
export class NutritionistEntity extends UserEntity {
  @Column()
  experienceYears: number;
  @Column()
  certificate: string;
  @Column()
  location: string;

  @Column({
    type: 'enum',
    enum: NutritionistStatusEnum,
    default: NutritionistStatusEnum.WAITING,
  })
  status: NutritionistStatusEnum;
}
