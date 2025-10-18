import { z } from 'zod'

export const loginSchema = z.object({
    name: z
        .string()
        .min(5, 'O nome deve ter pelo menos 5 caracteres')
        .regex(
            /^[a-z]+$/,
            'O nome deve conter apenas letras minúsculas, sem espaços'
        ),
    password: z
        .string()
        .min(6, 'A senha deve ter pelo menos 6 caracteres')
});

export type LoginUserFormData = z.infer<typeof loginSchema>;