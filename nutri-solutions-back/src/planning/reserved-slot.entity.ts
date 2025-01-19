import { TimeStampEntity } from 'src/common/db-utilities/time-stamp.entity';
import { Client } from 'src/user/client/client.entity';
import { Nutritionist } from 'src/user/nutritionist/nutritionist.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  ManyToOne,
} from 'typeorm';

@Entity()
export class ReservedSlot extends TimeStampEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  date: Date;

  @Column()
  day: string;

  @Column()
  time: string;

  @ManyToOne(() => Client, (client) => client.reservedSlots, {
    onDelete: 'CASCADE',
  })
  client: Client;

  @ManyToOne(() => Nutritionist, (nutritionist) => nutritionist.reservedSlots, {
    onDelete: 'CASCADE',
  })
  nutritionist: Nutritionist;
}
