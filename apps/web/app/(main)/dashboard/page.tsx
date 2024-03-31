import { LogoutButton } from "@/ui/logout-button"

interface PageProps {}

const Page = ({}: PageProps) => {
	return (
		<main>
			<h1>Dashboard</h1>
			<LogoutButton />
		</main>
	)
}

export default Page
