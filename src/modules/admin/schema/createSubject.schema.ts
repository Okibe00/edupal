import z from  'zod';

export const createSubjectSchema = z.object({
 classId: z.uuid(),
 name: z.string(),
})
export type createSubjectType = z.infer<typeof createSubjectSchema>;