'use client';

import { createClient } from "@/lib/supabase/client";
import { RegisterSchema, registerFormSchema } from "@/lib/zod/register-form-schema";
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage, Input } from "@pwd/ui";
import { AuthError } from '@supabase/supabase-js';
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";

interface RegisterFormProps {}

const intlErrors = new Map([
	['Invalid login credentials', 'Email/Senha incorreto'],
	['Email link is invalid or has expired', 'O link de acesso é inválido ou já expirou']
])

export const RegisterForm = ({}: RegisterFormProps) => {
	const searchParams = useSearchParams();
	const redir = searchParams?.get('redir')
	const error = searchParams?.get('error')
	const anounce = searchParams?.get('anounce')

	const form = useForm<RegisterSchema>({
		resolver: zodResolver(registerFormSchema),
	});

	const onSubmit: SubmitHandler<RegisterSchema> = async ({ email, password }) => {
		const supabase = createClient();

		let path = redir || `/`,
			error: AuthError | null = null

		const result = await supabase.auth.signUp({ email, password })
		error = result.error

		if (error) {
			path = `/register?error=${error.message}`
		} else if (!result.data.session) {
			path = `/register?anounce=${encodeURIComponent('Um link de confirmação foi enviado para seu e-mail')}`
		}

		window.location.replace(path)
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4 max-w-screen-sm mx-auto">
				{!!error && (
					<div className="p-4 rounded border border-destructive bg-destructive/20 text-destructive">
						<b>Erro:</b> {intlErrors.get(error) || 'Ocorreu algum erro em nossos servidores, tente novamente mais tarde.'}
					</div>
				)}

				{!!anounce && (
					<div className="p-4 rounded border border-primary bg-primary/20 text-primary">
						{anounce || 'Solicitado com sucesso!'}
					</div>
				)}

				<FormField
					control={form.control}
					name="email"
					render={({ field }) => (
						<FormItem>
							<FormLabel>E-mail</FormLabel>

							<FormControl>
								<Input placeholder="seuemail@servidor.com" {...field} />
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="password"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Senha</FormLabel>

							<FormControl>
								<Input placeholder="Su4 S3nHa sEcRet4" {...field} />
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="confirm_password"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Confirme sua senha</FormLabel>

							<FormControl>
								<Input placeholder="Su4 S3nHa sEcRet4" {...field} />
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>

				<FormDescription>
					Ao registrar-se você declara que leu e aceita os{' '}
					<Link className="text-primary hover:underline underline-offset-4" href="#">Termos de privacidade</Link>
				</FormDescription>

				<div className="grid grid-cols-3">
					<div className="flex gap-6 w-full col-span-2">
						<Button asChild variant="link">
							<Link href="/">
								Acessar
							</Link>
						</Button>
					</div>

					<div className="flex justify-end items-baseline">
						<Button type="submit">Registrar</Button>
					</div>
				</div>
			</form>
		</Form>
	)
}
