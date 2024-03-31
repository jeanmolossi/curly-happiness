import { z } from 'zod'

const PASSWORD_LENGTH = 6

export const loginFormSchema = z
	.object({
		provider: z.literal('password'),
		email: z
			.string({ required_error: 'O campo de e-mail é obrigatório' })
			.email({ message: 'O campo de e-mail deve ser um e-mail válido' }),
		password: z
			.string({ required_error: 'O campo de senha é obrigatório' })
			.min(PASSWORD_LENGTH, {
				message: `O campo de senha deve conter pelo menos ${PASSWORD_LENGTH} caracteres`,
			})
			.max(64, {
				message: 'O campo de senha deve ser menor que 64 caracteres',
			}),
	})
	.or(
		z.object({
			provider: z.literal('email'),
			email: z
				.string({ required_error: 'O campo de e-mail é obrigatório' })
				.email({
					message: 'O campo de e-mail deve ser um e-mail válido',
				}),
			password: z.undefined(),
		}),
	)

export type LoginSchema = z.infer<typeof loginFormSchema>
