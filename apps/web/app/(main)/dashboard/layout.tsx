import { LogoutButton } from "@/ui/logout-button"
import Navigation from "@/ui/nav"
import Image from "next/image"

const Layout = ({ children }: { children: React.ReactNode }) => {
	return (
		<main className="flex flex-col max-w-screen-sm w-full py-8 mx-auto gap-6">
			<header className="flex justify-between items-center">
				<Image
					alt="Logo"
				 	src={"/logo.svg"}
					width={160}
					height={32}
				/>

				<LogoutButton />
			</header>

			<Navigation />

			<section>
				{children}
			</section>
		</main>
	)
}

export default Layout
