import { faker } from '@faker-js/faker';
import { ClientModel } from 'src/app/models/client.model';
import { NutritionistModel } from 'src/app/models/nutritionist.model';
import {
  CategoryEnum,
  ObjectifEnum,
  PreparationTimeEnum,
  RecipeModel,
} from 'src/app/models/recipe.model';

// export function generateFakeNutritionist(): NutritionistModel {
//   return {
//     id: faker.string.uuid(),
//     name: 'Dr. ' + faker.name.firstName(),
//     email: faker.internet.email(),
//     phone: faker.phone.number(),
//     profilePictureUrl: faker.image.avatar(),
//     patientsNumber: faker.number.int({ min: 10, max: 500 }),
//     experience: faker.number.int({ min: 1, max: 20 }),
//     certifications: Array.from(
//       { length: faker.number.int({ min: 1, max: 5 }) },
//       () => faker.company.buzzNoun()
//     ),
//     bio: faker.lorem.sentences(2),
//     location: faker.address.city(),
//     consultationFee: faker.number.int({ min: 50, max: 300 }),
//     ratings: faker.number.int({ min: 0, max: 5 }),

//     // New fields
//     address: faker.address.streetAddress(),
//     certificate: 'certif_' + faker.string.alpha(5) + '.pdf',
//     status: faker.helpers.arrayElement(['Approuvé', 'En attente', 'Rejeté']),
//     addedAt: faker.date.recent(), // Generates a recent date
//   };
// }

// export function generateFakeClient(): ClientModel {
//   return new ClientModel(
//     faker.string.uuid(),
//     faker.name.fullName(),
//     faker.internet.email(),
//     faker.phone.number(),
//     faker.image.avatar(),

//     faker.helpers.arrayElement(['Male', 'Female']),

//     faker.date.between({ from: '1950-01-01', to: '2003-01-01' }),

//     faker.number.int({ min: 150, max: 200 }),
//     faker.number.int({ min: 50, max: 100 }),

//     Array.from(
//       { length: faker.number.int({ min: 1, max: 3 }) },
//       generateFakeRecipe
//     ),
//     faker.helpers.arrayElement(
//       Object.values(ObjectifEnum).filter(
//         (objectif) => objectif != ObjectifEnum.ALL
//       )
//     ),
//     Array.from({ length: faker.number.int({ min: 1, max: 5 }) }, () =>
//       faker.date.future().toISOString()
//     )
//   );
// }

export function generateFakeRecipe(): RecipeModel {
  return {
    id: faker.string.uuid(),
    name: faker.lorem.words(faker.number.int({ min: 1, max: 3 })),
    description: faker.lorem.sentence(),
    category: faker.helpers.arrayElement(
      Object.values(CategoryEnum).filter(
        (category) => category !== CategoryEnum.ALL
      )
    ),
    objectif: faker.helpers.arrayElement(
      Object.values(ObjectifEnum).filter(
        (objectif) => objectif !== ObjectifEnum.ALL
      )
    ),
    preparationTime: faker.helpers.arrayElement(
      Object.values(PreparationTimeEnum).filter(
        (time) => time !== PreparationTimeEnum.ALL
      )
    ),
    ingredients: Array.from(
      { length: faker.number.int({ min: 3, max: 5 }) },
      () => faker.lorem.sentence()
    ),
    imageUrl: `assets/images/recipe${faker.number.int({ min: 1, max: 6 })}.png`,
    calories: faker.number.int({ min: 100, max: 2000 }),
    protein: faker.number.int({ min: 10, max: 50 }),
    fat: faker.number.int({ min: 5, max: 30 }),
    carbohydrates: faker.number.int({ min: 20, max: 100 }),
    createdBy: faker.internet.userName(),
    createdAt: faker.date.past(),
    instructions: Array.from(
      { length: faker.number.int({ min: 3, max: 5 }) },
      () => faker.lorem.sentence()
    ),
    cookingNotes: Array.from(
      // New field for cooking notes as an array of strings
      { length: faker.number.int({ min: 1, max: 3 }) },
      () => faker.lorem.sentence()
    ),
  };
}

// export function generateFakeClient(): ClientModel {
//   return {
//     id: faker.string.uuid(),
//     name: faker.name.fullName(),
//     email: faker.internet.email(),
//     phone: faker.phone.number(),
//     profilePictureUrl: faker.image.avatar(),
//     address: faker.address.streetAddress(),
//     age: faker.number.int({ min: 18, max: 80 }),
//     height: faker.number.int({ min: 150, max: 200 }),
//     weight: faker.number.int({ min: 50, max: 100 }),
//     gender: faker.helpers.arrayElement(['Male', 'Female']),
//     favoriteRecipes: Array.from(
//       { length: faker.number.int({ min: 1, max: 3 }) },
//       generateFakeRecipe
//     ),
//     appointments: Array.from(
//       { length: faker.number.int({ min: 1, max: 5 }) },
//       () =>
//         new Date(faker.date.future()).toLocaleString('en-US', {
//           year: 'numeric',
//           month: 'long',
//           day: 'numeric',
//           hour: '2-digit',
//           minute: '2-digit'
//         })
//     ),
//   };
// }
