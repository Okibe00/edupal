import z from 'zod';

export const signupSchema = z.object({
  name: z.string().min(2),
  email: z.email(),
  password: z
    .string()
    .regex(/^[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+$/)
    .min(8)
    .max(20),
});
export const loginSchema = signupSchema.pick({
  email: true,
  password: true,
});
export const tokenSchema = z.object({ token: z.string() });

export type signUpType = z.infer<typeof signupSchema>;
export type loginType = z.infer<typeof loginSchema>;
