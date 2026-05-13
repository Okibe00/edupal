import { z } from 'zod';

export const CreateTermSchema = z.object({
  name: z.string().min(1),
  academicSessionId: z.uuid(),
  termNumber: z.number().int().positive(),
});

export type CreateTermType = z.infer<typeof CreateTermSchema>;