import { z } from 'zod';

const currentYear = new Date().getFullYear();
const createBikeValidationSchema = z.object({
  body: z.object({
    name: z.string(),
    description: z.string(),
    pricePerHour: z.number(),
    isAvailable: z.boolean().optional(),
    cc: z.number().min(20).max(3000),
    year: z.number().min(1900).max(currentYear),
    model: z.string(),
    brand: z.string(),
    image: z.string().optional(),
  }),
});

const updateBikeValidationSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    description: z.string().optional(),
    pricePerHour: z.number().optional(),
    isAvailable: z.boolean().optional().optional(),
    cc: z.number().min(20).max(3000).optional(),
    year: z.number().min(1900).max(currentYear).optional(),
    model: z.string().optional(),
    brand: z.string().optional(),
    image: z.string().optional(),
  }),
});

export const BikeValidations = {
  createBikeValidationSchema,
  updateBikeValidationSchema,
};
