import { z } from 'zod';

export const schema = z.object({
  taskName: z
    .string()
    .min(3, { message: "Task Name must be at least 3 characters" })
    .max(50),
  description: z
    .string()
    .min(3, { message: "Description must be at least 3 characters" })
    .max(250),
  urgency: z.enum(['LOW', 'MEDIUM', 'HIGH'], {
    errorMap: () => ({ message: "Please use one of the drop down options" }),
  }),
  dueDate: z
    .string()
    .refine((value) => {
      const date = new Date(value);
      return !isNaN(date.getTime());
    }, { message: "Invalid date" })
    .transform((value) => new Date(value)),
});
