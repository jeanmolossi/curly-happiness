import { withAuth } from '@/lib/auth'
import prisma from '@/lib/prisma'
import { revalidateTag } from 'next/cache'
import { NextResponse } from 'next/server'
import { z } from 'zod'

export const GET = withAuth(async ({ params, user }) => {
	const result = await prisma.password.findFirst({
		where: {
			id: params.id,
			AND: { ownerId: user.id },
		},
		select: {
			title: true,
			host: true,
			shortcut: true,
			username: true,
		},
	})

	if (!result) {
		return NextResponse.json(
			{
				message: 'Not found. Password was not found',
			},
			{ status: 404 },
		)
	}

	return NextResponse.json({
		content: result,
		actions: [
			{
				rel: 'delete',
				method: 'DELETE',
				href: '',
			},
		],
	})
})

export const PUT = withAuth(async ({ request, params, user }) => {
	const body = await request.json()

	try {
		const data = z
			.object({
				title: z.string(),
				host: z.string().url(),
				shortcut: z.string().url().optional(),
				username: z.string().optional(),
				password: z.string().min(1),
				ownerId: z.string(),
			})
			.parse({
				...body,
				ownerId: user.id,
			})

		await prisma.password.update({
			where: {
				id: params.id,
				AND: { ownerId: user.id },
			},
			data,
		})

		revalidateTag('passreveal')
		revalidateTag('mypasswords')
		return NextResponse.json(null, { status: 202 })
	} catch (error) {
		return NextResponse.json(null, { status: 400 })
	}
})

export const DELETE = withAuth(async ({ params, user }) => {
	const { id } = await prisma.password.delete({
		where: {
			id: params.id,
			AND: { ownerId: user.id },
		},
		select: { id: true },
	})

	return NextResponse.json(null, { status: !!id ? 202 : 404 })
})
