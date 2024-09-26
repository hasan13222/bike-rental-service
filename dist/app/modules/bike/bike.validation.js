"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BikeValidations = void 0;
const zod_1 = require("zod");
const currentYear = new Date().getFullYear();
const createBikeValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string(),
        description: zod_1.z.string(),
        pricePerHour: zod_1.z.number(),
        isAvailable: zod_1.z.boolean().optional(),
        cc: zod_1.z.number().min(20).max(3000),
        year: zod_1.z.number().min(1900).max(currentYear),
        model: zod_1.z.string(),
        brand: zod_1.z.string(),
        image: zod_1.z.string().optional(),
    }),
});
const updateBikeValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().optional(),
        description: zod_1.z.string().optional(),
        pricePerHour: zod_1.z.number().optional(),
        isAvailable: zod_1.z.boolean().optional().optional(),
        cc: zod_1.z.number().min(20).max(3000).optional(),
        year: zod_1.z.number().min(1900).max(currentYear).optional(),
        model: zod_1.z.string().optional(),
        brand: zod_1.z.string().optional(),
        image: zod_1.z.string().optional(),
    }),
});
exports.BikeValidations = {
    createBikeValidationSchema,
    updateBikeValidationSchema,
};
