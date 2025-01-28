import { TimeStampEntity } from 'src/common/db-utilities/time-stamp.entity';
import { Nutritionist } from 'src/user/nutritionist/nutritionist.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  TableInheritance,
} from 'typeorm';

@Entity()
@TableInheritance({ column: { type: 'varchar', name: 'type' } })
export class UnavailableSlot extends TimeStampEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  date: Date;

  @Column()
  day: string;

  @Column()
  time: string;

  @ManyToOne(() => Nutritionist, (nutritionist) => nutritionist.unavailableSlots, {
    onDelete: 'CASCADE',
    eager: true,
  })
  nutritionist: Nutritionist;

  @Column({ type: 'boolean', default: false })
  isReservation: boolean;
}
