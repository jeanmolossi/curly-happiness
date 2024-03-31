import { LoginForm } from '@/ui/login-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@pwd/ui';
import Image from "next/image";

export default function Page(): JSX.Element {

	return (
		<main className={'grid grid-cols-1 place-content-center min-h-screen p-8'}>
			<div className='max-w-screen-sm w-full mx-auto'>
				<div className="mb-8">
					<Image src="/logo.svg" width={160} height={32} alt="Your app logo" />
				</div>

				<Card>
					<CardHeader>
						<CardTitle>Acesse</CardTitle>

						<CardDescription>
							Acesse agora mesmo para gerenciar suas senhas e compartilhar
							arquivos de configurações de ambiente de forma segura
						</CardDescription>
					</CardHeader>

					<CardContent>
						<LoginForm />
					</CardContent>
				</Card>
			</div>
		</main>
	)
}
