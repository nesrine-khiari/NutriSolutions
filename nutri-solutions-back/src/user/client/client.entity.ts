import { TimeStampEntity } from 'src/common/db-utilities/time-stamp.entity';
import { GenderEnum } from 'src/enums/user-enums';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  TableInheritance,
  ManyToMany,
  JoinTable,
  ChildEntity,
  OneToMany,
  AfterLoad,
  AfterInsert,
} from 'typeorm';
import { UserEntity } from '../user.entity';
import { ActivityLevelEnum, ObjectifEnum } from 'src/enums/recipe-enums';
import { RecipeEntity } from 'src/recipe/recipe-entity';
import { ReservedSlot } from 'src/planning/reserved-slot/reserved-slot.entity';

@ChildEntity()
export class Client extends UserEntity {
  @Column({
    type: 'enum',
    enum: ObjectifEnum,
    default: ObjectifEnum.ALL,
  })
  objectif: ObjectifEnum;

  @Column({
    type: 'enum',
    enum: ActivityLevelEnum,
    default: ActivityLevelEnum.LEG_ACTIF,
  })
  activityLevel: ActivityLevelEnum;

  @Column()
  weight: number;
  @Column()
  height: number;

  @ManyToMany(() => RecipeEntity, (recipe) => recipe.favoritedByClient)
  @JoinTable({
    name: 'favorite_recipes',
    joinColumn: { name: 'client_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'recipe_id', referencedColumnName: 'id' },
  })
  favoriteRecipes: RecipeEntity[];

  @OneToMany(() => ReservedSlot, (reservedSlot) => reservedSlot.client)
  reservedSlots: ReservedSlot[];
  @Column({ default: 0 })
  reservedSlotsCount: number;
}
