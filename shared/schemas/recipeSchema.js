import { z } from 'zod';

export const recipeSchema = z.object({
  name: z.string().min(1, { message: 'Recipe name is required.' }),
  ingredients: z
    .array(
      z.object({
        name: z.string().min(1, { message: 'Ingredient name is required.' }),
        quantity: z.string().min(1, { message: 'Quantity is required.' }),
      }),
    )
    .min(1, { message: 'At least one ingredient is required.' }),
  instructions: z.string().min(1, { message: 'Instructions are required.' }),

  // Optional fields
  prepMinutes: z.number().min(0).optional().nullable(),
  cookMinutes: z.number().min(0).optional().nullable(),
  numServings: z.number().min(0).optional().nullable(),
  image: z
    .string()
    .url({ message: 'Must be a valid URL.' })
    .optional()
    .or(z.literal('')),
});
