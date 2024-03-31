'use client';

import { createClient } from "@/lib/supabase/client";
import { LoginSchema, loginFormSchema } from "@/lib/zod/login-form-schema";
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Form, FormControl, FormField, FormItem, FormLabel, FormMessage, Input, Switch } from "@pwd/ui";
import { cn } from "@pwd/utils";
import { AuthError } from '@supabase/supabase-js';
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

interface LoginFormProps {}

const intlErrors = new Map([
	['Invalid login credentials', 'Email/Senha incorreto'],
	['Email link is invalid or has expired', 'O link de acesso é inválido ou já expirou']
])

export const LoginForm = ({}: LoginFormProps) => {
	const searchParams = useSearchParams();
	const redir = searchParams?.get('redir')
	const error = searchParams?.get('error')

	const [loginWithEmailOption, setLoginWithEmailOption] = useState(false);

	const form = useForm<LoginSchema>({
		resolver: zodResolver(loginFormSchema),
		defaultValues: { provider: 'password' }
	});

	const handleSwitchLoginWithEmail = (checked: boolean) => {
		setLoginWithEmailOption(checked);
		form.setValue('provider', checked ? 'email' : 'password')
	}

	const onSubmit: SubmitHandler<LoginSchema> = async ({ email, password, provider }) => {
		const supabase = createClient();

		let path = redir || `/`,
			error: AuthError | null = null

		if (provider === 'email') {
			console.warn('not implemented yet')
			const result = await supabase.auth.signInWithOtp({
				email,
				options: {
					shouldCreateUser: false,
					emailRedirectTo: redir || `http://dashboard.localhost:3000/`
				}
			})

			error = result.error
		} else {
			const result = await supabase.auth.signInWithPassword({ email, password })
			error = result.error
		}

		if (error) {
			path = `/?error=${error.message}`
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
						<FormItem className={cn({'h-0 invisible': loginWithEmailOption })}>
							<FormLabel>Senha</FormLabel>

							<FormControl>
								<Input placeholder="Su4 S3nHa sEcRet4" {...field} />
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>

				<FormItem className="flex gap-2">
					<FormControl>
						<Switch onCheckedChange={handleSwitchLoginWithEmail} />
					</FormControl>

					<FormLabel className="m-0">Continuar com e-mail</FormLabel>

					<FormMessage />
				</FormItem>

				<div className="grid grid-cols-3">
					<div className="flex gap-6 w-full col-span-2">
						<Button asChild variant="link">
							<Link href="/recuperar-senha">
								Esqueci minha senha
							</Link>
						</Button>

						<Button asChild variant="link">
							<Link href="/register">
								Cadastre-se
							</Link>
						</Button>
					</div>

					<div className="flex justify-end items-baseline">
						<Button type="submit">Entrar</Button>
					</div>
				</div>
			</form>
		</Form>
	)
}
