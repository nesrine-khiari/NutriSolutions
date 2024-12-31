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
} from 'typeorm';
import { UserEntity } from '../user.entity';
import { ObjectifEnum } from 'src/enums/recipe-enums';
import { RecipeEntity } from 'src/recipe/recipe-entity';

@ChildEntity()
export class ClientEntity extends UserEntity {
  @Column({
    type: 'enum',
    enum: ObjectifEnum,
    default: ObjectifEnum.ALL,
  })
  objectif: ObjectifEnum;

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
}
