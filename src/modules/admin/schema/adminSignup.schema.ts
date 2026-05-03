import z from 'zod';

export const createAdminSchema = z.object({
  name: z.string().min(3),
  email: z.email(),
  password: z
    .string()
    .regex(/^[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+$/)
    .min(8)
    .max(20),
});

export type createAdminType = z.infer<typeof createAdminSchema>;