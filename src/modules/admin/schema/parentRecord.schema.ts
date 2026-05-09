import z from 'zod';

const nonEmptyString = z
  .string()
  .refine((s) => s.trim().length > 0, { error: 'Required' })

const ParentSchema = z.object({
  name: nonEmptyString,
  phone: nonEmptyString,
  email: nonEmptyString,
  password: nonEmptyString,
});

const ChildSchema = z.object({
  name: nonEmptyString,
  class: nonEmptyString,
  admissionNumber: nonEmptyString,
});

const ItemSchema = z.object({
  parent: ParentSchema,
  children: z.array(ChildSchema),
});

export const ParentRecordSchema = z.array(ItemSchema);

export type ParentRecordSchemaType = z.infer<typeof ParentRecordSchema>;
