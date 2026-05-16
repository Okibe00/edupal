import z from 'zod';

export const SchoolStateSchema = z.object({
  week: z.number().gte(1),
  term: z.string(),
});

export type SchoolStateSchemaType = z.infer<typeof SchoolStateSchema>;
