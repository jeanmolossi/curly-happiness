import { withAuth } from '@/lib/auth'
import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'

export const GET = withAuth(async ({ params, user }) => {
	const result = await prisma.password.findFirst({
		where: {
			id: params.id,
			AND: { ownerId: user.id },
		},
		select: { password: true },
	})

	if (!result) {
		return new NextResponse(null, { status: 404 })
	}

	return new NextResponse(result.password)
})
