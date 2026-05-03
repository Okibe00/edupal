import z from 'zod';

export const teachingAssignmentSchema = z.object({
  classId: z.uuid(),
  subjectId: z.uuid(),
  teacherId: z.uuid(),
});

export type teachingAssignmentType = z.infer<typeof teachingAssignmentSchema>;
