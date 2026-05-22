import z from 'zod';

const nonEmptyString = z
  .string()
  .refine((s) => s.trim().length > 0, { error: 'Required' });

const ParentSchema = z.object({
  name: nonEmptyString,
  phone: nonEmptyString,
  email: z.email(),
  password: nonEmptyString,
});

const ChildSchema = z.object({
  name: nonEmptyString,
  class: nonEmptyString,
  admissionNumber: nonEmptyString,
});
export const parentChildSchema = z.object({
  parent_name: z.string(),
  parent_phone: z.string(),
  parent_email: z.email(),
  child_name: z.string(),
  child_class: z.string(),
  admission_number: z.string(),
});
const ItemSchema = z.object({
  parent: ParentSchema,
  children: z.array(ChildSchema),
});
export const ParentChildRecord = z.array(parentChildSchema);
export const ParentRecordSchema = z.array(ItemSchema);

export type ParentRecordSchemaType = z.infer<typeof ParentRecordSchema>;
export type ParentChildRecordSchemaType = z.infer<typeof ParentChildRecord>;
