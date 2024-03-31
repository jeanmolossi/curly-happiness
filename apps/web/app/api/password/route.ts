import { withAuth } from '@/lib/auth'
import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { NextResponse } from 'next/server'
import { z } from 'zod'

export const POST = withAuth(async ({ request, user }) => {
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

		await prisma.password.create({
			data: {
				title: data.title,
				host: data.host,
				password: data.password,
				username: data.username || null,
				shortcut: data.shortcut || data.host,
				ownerId: data.ownerId,
			},
		})

		revalidatePath('/(main)/dashboard', 'page')

		return NextResponse.json(data)
	} catch (error) {
		return NextResponse.json(error.message || 'Internal server error', {
			status: 400,
		})
	}
})

export const GET = withAuth(async ({ request, user, searchParams }) => {
	const take = isNaN(+searchParams.limit) ? 30 : +searchParams.limit
	const offset = isNaN(+searchParams.offset) ? 0 : +searchParams.offset

	const passwords = await prisma.password.findMany({
		where: {
			ownerId: user.id,
			...(searchParams.search && {
				OR: [
					{ shortcut: { contains: searchParams.search } },
					{ title: { contains: searchParams.search } },
				],
			}),
		},
		take,
		skip: offset,
		select: {
			id: true,
			title: true,
			host: true,
			shortcut: true,
			createdAt: true,
			updatedAt: true,
			revealedAt: true,
		},
		orderBy: { revealedAt: 'desc' },
	})

	const url = new URL(request.url)

	const resource = (path?: string) => {
		return `${url.protocol}//${url.host}/api/password${!!path ? `/${path}` : ''}`
	}

	const response = {
		content: passwords.map(password => {
			const actions = [
				{
					rel: 'reveal',
					method: 'GET',
					href: resource(`${password.id}/reveal`),
				},
				{
					rel: 'self',
					method: 'GET',
					href: resource(password.id),
				},
				{
					rel: 'edit',
					method: 'PUT',
					href: resource(password.id),
				},
				{
					rel: 'delete',
					method: 'DELETE',
					href: resource(password.id),
				},
			]

			return {
				...password,
				actions,
			}
		}),
		pagination: {
			first_page: '',
			prev_page: '',
			next_page: '',
			last_page: '',
		},
	}

	return NextResponse.json(response)
})
