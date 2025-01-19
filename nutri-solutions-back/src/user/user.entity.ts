import { TimeStampEntity } from 'src/common/db-utilities/time-stamp.entity';
import { GenderEnum, UserRoleEnum } from 'src/enums/user-enums';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  TableInheritance,
} from 'typeorm';
@Entity()
@TableInheritance({
  column: { name: 'role', type: 'enum', enum: UserRoleEnum }, // Reference the existing column
})
export class UserEntity extends TimeStampEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  phoneNumber: string;

  @Column()
  profilePictureUrl: string;

  @Column({
    type: 'enum',
    enum: GenderEnum,
    default: GenderEnum.MALE,
  })
  gender: GenderEnum;

  @Column()
  birthDate: Date;

  @Column({
    type: 'enum',
    enum: UserRoleEnum,
    default: UserRoleEnum.CLIENT,
  })
  role: UserRoleEnum; // This column serves both as a property and the inheritance discriminator
}
