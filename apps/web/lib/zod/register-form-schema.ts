import { z } from 'zod'

const PASSWORD_MIN_LENGTH = 8
const PASSWORD_MAX_LENGTH = 64

export const registerFormSchema = z
	.object({
		email: z
			.string({ required_error: 'O e-mail é obrigatório' })
			.email({ message: 'O e-mail deve ser válido' }),
		password: z
			.string({ required_error: 'O campo de senha é obrigatório' })
			.min(PASSWORD_MIN_LENGTH, {
				message: `A senha deve conter pelo menos ${PASSWORD_MIN_LENGTH} caracteres`,
			})
			.max(PASSWORD_MAX_LENGTH, {
				message: `A senha deve conter até ${PASSWORD_MIN_LENGTH} caracteres`,
			}),
		confirm_password: z
			.string({
				required_error: 'O campo de confirmação de senha é obrigatório',
			})
			.min(PASSWORD_MIN_LENGTH, {
				message: `A senha deve conter pelo menos ${PASSWORD_MIN_LENGTH} caracteres`,
			})
			.max(PASSWORD_MAX_LENGTH, {
				message: `A senha deve conter até ${PASSWORD_MIN_LENGTH} caracteres`,
			}),
	})
	.superRefine(({ password, confirm_password }, ctx) => {
		if (confirm_password !== password) {
			ctx.addIssue({
				code: 'invalid_literal',
				expected: password,
				received: confirm_password,
				message: 'As senhas devem ser iguais',
				path: ['confirm_password'],
			})
		}
	})

export type RegisterSchema = z.infer<typeof registerFormSchema>
