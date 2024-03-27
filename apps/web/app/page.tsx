import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle } from "@repo/ui"
import { ArrowRightCircle } from "lucide-react"
import Image from "next/image"

const LINKS = [
	{
		title: 'Docs',
		href: 'http://localhost:3001',
		description:
			'Find in-depth information about App features and API.',
	},
	{
		title: 'Learn',
		href: 'http://localhost:3001/handbook',
		description: 'Learn more about App with our handbook.',
	},
	{
		title: 'Templates',
		href: 'http://localhost:3001/getting-started/from-example',
		description:
			'Choose from over 15 examples and deploy with a single click.',
	},
	{
		title: 'Deploy',
		href: 'https://vercel.com/new',
		description:
			'Instantly deploy your App to a shareable URL with Vercel.',
	},
]

export default function Page(): JSX.Element {
	return (
		<main className={'grid grid-cols-2 gap-4 place-content-center min-h-screen p-8'}>
			<div className="col-span-2">
				<Image src="/logo.svg" width={160} height={32} alt="Your app logo" />
			</div>

			{LINKS.map((link, i) => (
				<Card key={i}>
					<CardHeader>
						<CardTitle>{link.title}</CardTitle>
						<CardDescription>{link.description}</CardDescription>
					</CardHeader>

					<CardContent>
						<Button asChild>
							<a href={link.href} target="_blank" rel="noreferer noopener">
								Go now <ArrowRightCircle />
							</a>
						</Button>
					</CardContent>
				</Card>
			))}
		</main>
	)
}
