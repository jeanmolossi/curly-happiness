'use client';

import { Password } from '@prisma/client';
import {
	Button,
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@pwd/ui';
import { actionsToMapObject, cn } from '@pwd/utils';
import { randomBytes } from 'crypto';
import { ExternalLink, Eye, EyeOff, Loader2, PenBox, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import CopyButton from './copy-button';

interface PasswordCardProps {
	password: Password & {
		actions: Array<{
			rel: string;
			method: string;
			href: string;
		}>
	}
}

const fakePass = (length = 8) => {
	const size = Math.round(Math.random() * 16) + length
	return randomBytes(size).toString('hex').slice(0, length)
};

const PasswordCard = ({ password }: PasswordCardProps) => {
	const { id, title, host, shortcut, actions: acts } = password

	const [revealing, setRevealing] = useState(false);
	const [blurred, setBlurred] = useState(true)
	const [pass, setPassword] = useState(fakePass())

	const actions = actionsToMapObject(acts)

	const reveal = () => {
		if (!blurred) {
			setBlurred(true)
			setPassword(fakePass(pass.length))
			return
		}

		setRevealing(true)

		const revealAction = actions.get('reveal')!

		fetch(revealAction.href, {
			method: revealAction.method,
			next: { revalidate: 3600, tags: ['passreveal'] }
		})
			.then(async response => {
				const pwd = await response.text()
				setPassword(pwd)
				setBlurred(false)
			})
			.catch((err) => {
				console.error(err.message)
			})
			.finally(() => {
				setRevealing(false)
			})
	}

	const handleDelete = () => {
		const deleteAction = actions.get('delete')!

		fetch(deleteAction.href, { method: deleteAction.method })
			.then(async () => {
				window.location.reload()
			})
	}

	return (
		<Card>
			<CardHeader>
				<CardTitle>{title || host}</CardTitle>
				<CardDescription>{shortcut}</CardDescription>
			</CardHeader>

			<CardContent>
				<div className="inline-flex items-center w-full gap-4">
					<div className="border-2 border-muted rounded-md p-2 flex-1">
						<div className={cn('flex items-baseline justify-stretch', {'blur-sm': blurred})}>
							<span className={cn('w-full', {
								'select-all': !blurred,
								'select-none': blurred,
							})}>{pass}</span>
						</div>
					</div>

					<CopyButton id={id} />
				</div>
			</CardContent>

			<CardFooter className="gap-2">
				{actions.has('reveal') && (
					<Button
						size="icon"
						onClick={reveal}
						disabled={revealing}
						aria-disabled={revealing}
					>
						{revealing
							? <Loader2 className='animate-spin' />
							: blurred
								? <Eye />
								: <EyeOff />}
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

				{actions.has('delete') && (
					<Button variant="destructive" onClick={handleDelete}>
						<Trash2 className='w-4 h-4' />
						Deletar
					</Button>
				)}

				{actions.has('self') && (
					<Button asChild variant="link">
						<a href={shortcut || host} target='_blank'>
							<ExternalLink className='w-4 h-4' />
							Abrir página
						</a>
					</Button>
				)}
			</CardFooter>
		</Card>
	)
}

export default PasswordCard
