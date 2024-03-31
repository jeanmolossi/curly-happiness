import { z } from 'zod'

export const addPasswordSchema = z.object({
	title: z.string({
		required_error: 'Dê um nome/titulo para identificar sua senha',
	}),
	host: z.string().url({ message: 'O host deve ser uma url válida' }),
	username: z.string().optional(),
	password: z
		.string({ required_error: 'Você deve fornecer uma senha para salvar' })
		.min(4, { message: 'Sua senha deve ter mais de 4 caracteres' }),
	// recommended to better security
	// .regex(/[0-9]+/g, 'A senha deve conter ao menos um número')
	// .regex(/[a-z]+/g, 'A senha deve conter ao menos uma letra minúscula')
	// .regex(/[A-Z]+/g, 'A senha deve conter ao menos uma letra maíuscula')
	// .regex(/\W+/g, 'A senha deve possuir ao menos um símbolo'),
})

export type AddPasswordSchema = z.infer<typeof addPasswordSchema>
