import {
	Body,
	Container,
	Head,
	Heading,
	Html,
	Link,
	Preview,
	Section,
	Tailwind,
	Text
} from '@react-email/components';

export default function LoginLink({
	email = '',
	url = 'http://localhost:3000/api/auth/callback/email?callbackUrl='
}: {
	email: string;
	url: string
}) {
	return (
		<Html>
			<Head />
			<Preview>Seu login de acesso</Preview>
			<Tailwind>
				<Body className='mx-auto my-auto bg-white font-sans'>
					<Container className='mx-auto my-10 max-w-[500px] rounded border border-solid border-gray-200 px-10 py-5'>
						<Heading>Seu link de acesso</Heading>
						<Text>Bem vindo à APP_NAME</Text>
						<Section className="my-8 text-center">
							<Link href={url}>
								Acessar
							</Link>
						</Section>
					</Container>
				</Body>
			</Tailwind>
		</Html>
	)
}
