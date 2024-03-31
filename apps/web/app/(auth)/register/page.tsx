import { RegisterForm } from "@/ui/register-form"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@pwd/ui"
import Image from "next/image"

function Page() {
  return (
	<main className={'grid grid-cols-1 place-content-center min-h-screen p-8'}>
		<div className='max-w-screen-sm w-full mx-auto'>
			<div className="mb-8">
				<Image src="/logo.svg" width={160} height={32} alt="Your app logo" />
			</div>

			<Card>
				<CardHeader>
					<CardTitle>Cadastre-se</CardTitle>

					<CardDescription>
						Crie uma conta e começe a gerenciar suas senhas agora mesmo
					</CardDescription>
				</CardHeader>

				<CardContent>
					<RegisterForm />
				</CardContent>
			</Card>
		</div>
	</main>
  )
}

export default Page
