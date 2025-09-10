import { z } from 'zod';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
];

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

  prepMinutes: z.preprocess(
    (val) => (val === '' ? undefined : val),
    z.coerce
      .number({ invalid_type_error: 'Must be a number' })
      .min(0, "Prep time can't be negative")
      .optional()
      .nullable(),
  ),
  cookMinutes: z.preprocess(
    (val) => (val === '' ? undefined : val),
    z.coerce
      .number({ invalid_type_error: 'Must be a number' })
      .min(0, "Cook time can't be negative")
      .optional()
      .nullable(),
  ),
  numServings: z.preprocess(
    (val) => (val === '' ? undefined : val),
    z.coerce
      .number({ invalid_type_error: 'Must be a number' })
      .min(0, "Servings can't be negative")
      .optional()
      .nullable(),
  ),

  // image schema is a union between a URL string on the backend and File type object on the frontend
  image: z
    .union([
      z.string().url({ message: 'Must be a valid URL.' }).or(z.literal('')),
      z
        .instanceof(File, { message: 'Image is required.' })
        .refine((file) => file.size <= MAX_FILE_SIZE, `Max file size is 5MB.`)
        .refine(
          (file) => ACCEPTED_IMAGE_TYPES.includes(file.type),
          'Only .jpg, .jpeg, .png and .webp formats are supported.',
        ),
    ])
    .optional()
    .nullable(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
});
