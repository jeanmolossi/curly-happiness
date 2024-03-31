'use client';

import { AddPasswordSchema, addPasswordSchema } from "@/lib/zod/add-password-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Form, FormControl, FormField, FormItem, FormLabel, FormMessage, Input } from "@pwd/ui";
import { getBaseUrl } from "@pwd/utils";
import { Loader2, Save } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

const Page = ({ params }: { params: { id: string } }) => {
	const [location, setLocation] = useState('')
	const [hydrating, setHydrating] = useState(true)

	const { replace } = useRouter()

	const form = useForm<AddPasswordSchema>({
		resolver: zodResolver(addPasswordSchema),
		defaultValues: { host: location }
	})

	const onSubmit: SubmitHandler<AddPasswordSchema> = async (data) => {
		const response = await fetch(`/api/password/${params.id}`, {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				...data,
				shortcut: window.location.href
			})
		})

		if (!response.ok) {
			console.error(await response.text())
			return
		}

		form.reset()
		replace('/dashboard')
	}

	useEffect(() => {
		setLocation(getBaseUrl(window.location.href))

		fetch(`/api/password/${params.id}`)
			.then(async response => {
				const { content: { host, title, username } } = await response.json()

				console.log({host,title,username})

				form.setValue('host', host || getBaseUrl(window.location.href))
				form.setValue('title', title || document.title)
				form.setValue('username', username)
			})
			.catch(err => {
				console.log(err.message)
			})
			.finally(() => {
				setHydrating(false)
			})
	}, [])

	return (
		<main>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="flex flex-col gap-4"
				>
					{hydrating && (
						<div className="inline-flex items-center gap-4 border border-primary bg-primary/20 text-primary rounded p-4">
							<Loader2 className="animate-spin" />
							Aguarde, carregando...
						</div>
					)}

					<FormField
						control={form.control}
						name="title"
						disabled={hydrating}
						render={({ field }) => (
							<FormItem>
								<FormLabel>Nome/Titulo</FormLabel>

								<FormControl>
									<Input
										placeholder="Window title"
										{...field}
									/>
								</FormControl>

								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="host"
						disabled={hydrating}
						defaultValue={location}
						render={({ field }) => (
							<FormItem>
								<FormLabel>Host</FormLabel>

								<FormControl>
									<Input
										placeholder={location}
										{...field}
									/>
								</FormControl>

								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="username"
						disabled={hydrating}
						render={({ field }) => (
							<FormItem>
								<FormLabel>Usuário</FormLabel>

								<FormControl>
									<Input placeholder="usuário" {...field} />
								</FormControl>

								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="password"
						disabled={hydrating}
						render={({ field }) => (
							<FormItem>
								<FormLabel>Senha</FormLabel>

								<FormControl>
									<Input placeholder="Senha" {...field} />
								</FormControl>

								<FormMessage />
							</FormItem>
						)}
					/>

					<Button
						type="submit"
						disabled={form.formState.isSubmitting || hydrating}
					>
						<Save />
						Salvar
					</Button>
				</form>
			</Form>
		</main>
	)
}

export default Page
