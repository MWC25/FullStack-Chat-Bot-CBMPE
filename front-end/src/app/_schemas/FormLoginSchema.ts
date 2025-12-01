import { z } from 'zod'

export const loginSchema = z.object({
    registration: z
        .string()
        .min(8, 'O nome deve ter pelo menos 8 números')
        .regex(
            /^[0-9]+$/,
            'A matricula deve conter apenas números'
        ),
    password: z
        .string()
        .min(6, 'A senhas são composta por pelo menos 6 caracteres')
});

export type FormDataLogin = z.infer<typeof loginSchema>;