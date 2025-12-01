import { z } from 'zod'

export const loginSchema = z.object({
    name: z
        .string(),
    password: z
        .string()
        .min(6, 'A senhas são composta por pelo menos 6 caracteres')
});

export type FormDataLogin = z.infer<typeof loginSchema>;