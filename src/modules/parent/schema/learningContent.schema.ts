import z from 'zod';

export const LearningContentSchema = z.object({
  status: z.enum(['DRAFT', 'ARCHIVED', 'PUBLISHED']),
  week: z.coerce.number(),
  subjectId: z.uuid(),
  topic: z.string(),
  learningObjectives: z.string(),
  learningContent: z.string(),
});

export type LearningContentType = z.infer<typeof LearningContentSchema>;
