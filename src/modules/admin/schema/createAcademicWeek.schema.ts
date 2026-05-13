import { z } from 'zod';

export const CreateWeekSchema = z.object({
  weekNumber: z.number().int().positive(),
  termId: z.uuid(),
});

export type CreateWeekType = z.infer<typeof CreateWeekSchema>;
