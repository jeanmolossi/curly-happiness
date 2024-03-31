import MyPasswordsList from "@/ui/my-passwords-list"
import SearchPasswordInput from "@/ui/search-password"
import { Button } from "@pwd/ui"
import Link from "next/link"
import { Suspense } from "react"

interface PageProps {}

const Page = ({}: PageProps) => {
	return (
		<main className="flex flex-col gap-6">
			<SearchPasswordInput />

			<Button asChild>
				<Link href="/dashboard/add">
					Nova senha
				</Link>
			</Button>

			<Suspense fallback={<div>Carregando...</div>}>
				<MyPasswordsList />
			</Suspense>
		</main>
	)
}

export default Page
