import z, { string } from 'zod';

export const CreateSchoolSchema = z.object({
  name: z.string().min(5).max(100),

  subdomain: z
    .string()
    .min(3)
    .max(50)
    .regex(/^[a-z0-9-]+$/, 'Only lowercase letters, numbers, and hyphens')
    .nullable(),

  brandColor: z
    .string()
    .regex(/^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/, 'Invalid hex color')
    .nullable(),

  type: z.string().nullable(),

  street: z.string().nullable(),
  city: z.string().nullable(),
  state: z.string().nullable(),

  tel: z
    .string()
    .regex(/^\+?[0-9]{10,15}$/, 'Invalid phone number')
    .nullable(),
});
export const logoSchema = z.object({
  logo: z.file().max(5_242_880).mime(['image/jpeg', 'image/png']),
});
export type createSchoolType = z.infer<typeof CreateSchoolSchema>;
