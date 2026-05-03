import z, { minLength } from  'zod';

export const createClassSchema = z.object({
  yearGroup: z.coerce.number(),
  name: z.string().min(1).max(50),
})
export type createClassType = z.infer<typeof createClassSchema>;