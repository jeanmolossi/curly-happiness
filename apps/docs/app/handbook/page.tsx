import { Card, CardDescription, CardHeader, CardTitle } from "@repo/ui"

export default function Page(): JSX.Element {
	return (
		<main className={'grid grid-cols-1 gap-4 max-w-screen-sm mx-auto place-content-center min-h-screen p-8'}>
			<Card>
				<CardHeader>
					<CardTitle>
						Handbook
					</CardTitle>

					<CardDescription>
						Some handbook docs
					</CardDescription>
				</CardHeader>
			</Card>
		</main>
	)
}
