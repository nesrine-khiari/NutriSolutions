import { Optional } from '@nestjs/common';
import { IsOptional } from 'class-validator';
import { TimeStampEntity } from 'src/common/db-utilities/time-stamp.entity';
import {
  CategoryEnum,
  ObjectifEnum,
  PreparationTimeEnum,
} from 'src/enums/recipe-enums';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class RecipeEntity extends TimeStampEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column('simple-array')
  ingredients: string[];


  @Column({ nullable: true })
  imageUrl: string;

  @Column()
  calories: number;

  @Column({
    type: 'enum',
    enum: CategoryEnum,
    default: CategoryEnum.ALL,
  })
  category: CategoryEnum;

  @Column({
    type: 'enum',
    enum: ObjectifEnum,
    default: ObjectifEnum.ALL,
  })
  objectif: ObjectifEnum;

  @Column({
    type: 'enum',
    enum: PreparationTimeEnum,
    default: PreparationTimeEnum.ALL,
  })
  preparationTime: PreparationTimeEnum;

  @Column()
  createdBy: string;

  @Column()
  protein: number;

  @Column()
  fat: number;

  @Column()
  carbohydrates: number;

  @Column('simple-array')
  instructions: string[];

  @Column('simple-array')
  cookingNotes: string[];
}
