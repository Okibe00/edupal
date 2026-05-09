import z from 'zod';
export const FetchAllSchema = z.object({
  limit: z.coerce.number(),
  page: z.coerce.number(),
});

export type createTeacherType = z.infer<typeof FetchAllSchema>;
