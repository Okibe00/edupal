import { z } from 'zod';

export const SchoolAcademicState = z.object({
  schoolId: z.uuid(),
  currentSessionId: z.uuid(),
  currentTermId: z.uuid(),
  currentWeekId: z.uuid(),
});

export type SchoolAcademicStateType = z.infer<typeof SchoolAcademicState>;
