import {
  Column,
  ChildEntity,
  OneToMany,
} from 'typeorm';
import { UserEntity } from '../user.entity';
import { NutritionistStatusEnum } from 'src/enums/user-enums';
import { UnavailableSlot } from 'src/planning/unavailable-slot/unavailable-slot.entity';

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
  @Column({ type: 'float', default: 3 })
  rating: number;

  @Column({ default: 0 })
  patientsNumber: number;

  @OneToMany(
    () => UnavailableSlot,
    (unavailableSlot) => unavailableSlot.nutritionist,
  )
  unavailableSlots: UnavailableSlot[];
}
