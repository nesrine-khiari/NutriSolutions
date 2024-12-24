import { faker } from '@faker-js/faker';
import { NutritionistModel } from 'src/app/models/nutritionist.model';
import {
  CategoryEnum,
  ObjectifEnum,
  RecipeModel,
} from 'src/app/models/recipe.model';

export function generateFakeNutritionist(): NutritionistModel {
  return {
    id: faker.string.uuid(),
    name: 'Dr. ' + faker.name.firstName(),
    email: faker.internet.email(),
    phone: faker.phone.number(),
    profilePictureUrl: faker.image.avatar(),
    patientsNumber: faker.number.int({ min: 10, max: 500 }),
    experience: faker.number.int({ min: 1, max: 20 }),
    certifications: Array.from(
      { length: faker.number.int({ min: 1, max: 5 }) },
      () => faker.company.buzzNoun()
    ),
    bio: faker.lorem.sentences(2),
    location: faker.address.city(),
    consultationFee: faker.number.int({ min: 50, max: 300 }),
    ratings: faker.number.int({ min: 0, max: 5 }),

    // New fields
    address: faker.address.streetAddress(),
    certificate: 'certif_' + faker.string.alpha(5) + '.pdf',
    status: faker.helpers.arrayElement(['Approuvé', 'En attente', 'Rejeté']),
    addedAt: faker.date.recent(), // Generates a recent date
  };
}

export function generateFakeRecipe(): RecipeModel {
  return {
    id: faker.string.uuid(),
    name: faker.lorem.words(faker.number.int({ min: 1, max: 1 })),
    description: faker.lorem.sentence(),
    category: faker.helpers.arrayElement(
      Object.values(CategoryEnum).filter(
        (category) => category != CategoryEnum.ALL
      )
    ),
    objectif: faker.helpers.arrayElement(
      Object.values(ObjectifEnum).filter(
        (objectif) => objectif != ObjectifEnum.ALL
      )
    ),
    ingredients: Array.from(
      { length: faker.number.int({ min: 3, max: 5 }) },
      () => faker.lorem.sentence()
    ),
    preparationTime: `${faker.number.int({ min: 5, max: 30 })} minutes`,
    cookingTime: `${faker.number.int({ min: 10, max: 60 })} minutes`,
    totalTime: `${faker.number.int({ min: 15, max: 90 })} minutes`,
    servings: faker.number.int({ min: 1, max: 6 }),
    instructions: Array.from(
      { length: faker.number.int({ min: 3, max: 5 }) },
      () => faker.lorem.sentence()
    ),
    cuisine: faker.helpers.arrayElement([
      'Italian',
      'Mexican',
      'Chinese',
      'Indian',
      'American',
    ]),
    difficulty: faker.helpers.arrayElement(['Easy', 'Medium', 'Hard']),
    imageUrl:
      'assets/images/recipe' + faker.number.int({ min: 1, max: 4 }) + '.png',
    calories: faker.number.int({ min: 100, max: 2000 }),
  };
}
