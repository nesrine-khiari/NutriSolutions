import { TimeStampEntity } from 'src/common/db-utilities/time-stamp.entity';
import { Client } from 'src/user/client/client.entity';
import { Nutritionist } from 'src/user/nutritionist/nutritionist.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  ManyToOne,
  TableInheritance,
} from 'typeorm';

@Entity()
@TableInheritance({
  column: { name: 'isReserved', type: 'boolean' },
})
export class UnavailableSlot extends TimeStampEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  date: Date;

  @Column()
  day: string;

  @Column()
  time: string;

  @ManyToOne(() => Nutritionist, (nutritionist) => nutritionist.reservedSlots, {
    onDelete: 'CASCADE',
    eager: true,
  })
  nutritionist: Nutritionist;

  @Column({ type: 'boolean', default: false })
  isReserved: boolean;
}
