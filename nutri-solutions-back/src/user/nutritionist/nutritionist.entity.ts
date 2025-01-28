import { TimeStampEntity } from 'src/common/db-utilities/time-stamp.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  TableInheritance,
  ManyToMany,
  JoinTable,
  ChildEntity,
  OneToMany,
} from 'typeorm';
import { UserEntity } from '../user.entity';
import { NutritionistStatusEnum } from 'src/enums/user-enums';
import { ReservedSlot } from 'src/planning/reserved-slot/reserved-slot.entity';
import { UnavailableSlot } from 'src/planning/unavailable-slot/unavailable-slot.entity';

@ChildEntity()
export class Nutritionist extends UserEntity {
  @Column()
  experienceYears: number;
  @Column()
  certificateUrl: string;
  @Column()
  location: string;
  @Column({ default: 0 })
  patientsNumber: number;
  @Column({
    type: 'enum',
    enum: NutritionistStatusEnum,
    default: NutritionistStatusEnum.WAITING,
  })
  status: NutritionistStatusEnum;
  @Column({default: 4})
  stars: number;

  @OneToMany(() => UnavailableSlot, (unavailableSlot) => unavailableSlot.nutritionist)
  unavailableSlots: UnavailableSlot[];
}
