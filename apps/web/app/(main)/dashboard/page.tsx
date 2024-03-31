import { authTokenFromCookies } from "@/lib/auth/auth-token"
import PasswordCard from "@/ui/password-card"
import SearchPasswordInput from "@/ui/search-password"
import { Password } from "@prisma/client"
import { Button } from "@pwd/ui"
import Link from "next/link"
import { Suspense } from "react"

interface PageProps {}

const Page = async ({}: PageProps) => {
	const authToken = authTokenFromCookies()

	const response = await fetch(`${process.env.NEXT_PUBLIC_APP_DOMAIN}/api/password`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${authToken}`
		},
		next: {
			revalidate: 15
		}
	})

	const emptyResponse = !response.ok;
	if (emptyResponse) {
		console.log(await response.text())
	}

	let passwords = {} as {
		content: Array<Password & {
			actions: Array<{
				rel: string;
				method: string;
				href: string;
			}>
		}>
	};

	if (!emptyResponse) {
		passwords = (await response.json())
	}

	return (
		<main className="flex flex-col gap-6">
			<SearchPasswordInput />

			<Button asChild>
				<Link href="/dashboard/add">
					Nova senha
				</Link>
			</Button>

			{emptyResponse ? (
				<div>
					<h1>Oops!</h1>
					<h2>Nada aqui</h2>
				</div>
			) : passwords.content.map((password) => (
				<div key={password.id}>
					<Suspense>
						<PasswordCard password={password}  />
					</Suspense>
				</div>
			))}
		</main>
	)
}

export default Page
