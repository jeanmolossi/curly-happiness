import { Password } from '@prisma/client'
import {
	Button,
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@pwd/ui'
import { actionsToMapObject } from '@pwd/utils'
import { randomBytes } from 'crypto'
import { ExternalLink, Eye, PenBox } from 'lucide-react'
import Link from 'next/link'
import CopyButton from './copy-button'

interface PasswordCardProps {
	password: Password & {
		actions: Array<{
			rel: string;
			method: string;
			href: string;
		}>
	}
}

const PasswordCard = ({ password }: PasswordCardProps) => {
	const { id, title, host, shortcut, actions: acts } = password

	const actions = actionsToMapObject(acts)

	return (
		<Card>
			<CardHeader>
				<CardTitle>{title || host}</CardTitle>
				<CardDescription>{shortcut}</CardDescription>
			</CardHeader>

			<CardContent>
				<div className="inline-flex items-center w-full gap-4">
					<div className="border-2 border-muted rounded-md p-2 flex-1">
						<div className="blur-sm flex items-baseline justify-between">
							<span>
								{randomBytes(
									Math.round(Math.random() * 16) + 8,
								).toString('hex')}
							</span>
						</div>
					</div>

					<CopyButton id={id} />
				</div>
			</CardContent>

			<CardFooter className="gap-2">
				{actions.has('reveal') && (
					<Button size="icon">
						<Eye />
						<span className="sr-only">Relevar</span>
					</Button>
				)}

				{actions.has('edit') && (
					<Button asChild variant="outline">
						<Link href={`/dashboard/${id}/edit`}>
							<PenBox className="w-4 h-4" />
							Alterar
						</Link>
					</Button>
				)}

				{actions.has('self') && (
					<Button asChild variant="link">
						<a href={shortcut || host} target='_blank'>
							<ExternalLink className='w-4 h-4' />
							Abrir
						</a>
					</Button>
				)}
			</CardFooter>
		</Card>
	)
}

export default PasswordCard
