'use client';

import { Password } from "@prisma/client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import PasswordCard from "./password-card";

const MyPasswordsList = () => {
	const searchParams = useSearchParams()

	const [loading, setLoading] = useState(true)
	const [passwords, setPasswords] = useState<Array<Password & {
		actions: Array<{
			rel: string;
			method: string;
			href: string;
		}>
	}>>([])

	useEffect(() => {
		fetch(`${process.env.NEXT_PUBLIC_APP_DOMAIN}/api/password?${searchParams.toString()}`, {
			method: 'GET',
			headers: { 'Content-Type': 'application/json' },
			next: {
				revalidate: 3600,
				tags: ['mypasswords']
			}
		})
		.then(async response => {
			const { content } = await response.json()
			setPasswords(content)
		})
		.finally(() => {
			setLoading(false)
		})
	}, [searchParams])

	if (loading) {
		<div>Carregando...</div>
	}

	if (passwords.length === 0 && !loading) {
		return (
			<div>
				Você ainda não possui senhas, adicione uma!
			</div>
		)
	}

	return passwords.map((password) => (
			<div key={password.id}>
				<PasswordCard password={password}  />
			</div>
		)
	)
}

export default MyPasswordsList
