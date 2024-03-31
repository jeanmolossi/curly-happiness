'use client';

import { AddPasswordSchema, addPasswordSchema } from "@/lib/zod/add-password-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Form, FormControl, FormField, FormItem, FormLabel, FormMessage, Input } from "@pwd/ui";
import { getBaseUrl } from "@pwd/utils";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

const Page = () => {
	const [location, setLocation] = useState('')

	const { replace } = useRouter()

	const form = useForm<AddPasswordSchema>({
		resolver: zodResolver(addPasswordSchema),
		defaultValues: { host: location }
	})

	const onSubmit: SubmitHandler<AddPasswordSchema> = async (data) => {
		const response = await fetch('/api/password', {
			method: 'POST',
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
		form.setValue('host', getBaseUrl(window.location.href))
		form.setValue('title', document.title)
	}, [])

	return (
		<main>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="flex flex-col gap-4"
				>
					<FormField
						control={form.control}
						name="title"
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

					<Button type="submit" disabled={form.formState.isSubmitting}>
						Salvar
					</Button>
				</form>
			</Form>
		</main>
	)
}

export default Page
