import { withAuth } from '@/lib/auth'
import prisma from '@/lib/prisma'
import { revalidateTag } from 'next/cache'
import { NextResponse } from 'next/server'

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

export const PUT = withAuth(async ({}) => {
	revalidateTag('passreveal')
	return NextResponse.json(null)
})
