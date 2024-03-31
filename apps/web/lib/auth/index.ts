import prisma from '@/lib/prisma'
import { getSearchParams } from '@pwd/utils'
import { cookies } from 'next/headers'
import { createClient } from '../supabase/server'

interface WithAuthHandler {
	({
		request,
		params,
		searchParams,
		headers,
		user,
	}: {
		request: Request
		params: Record<string, string>
		searchParams: Record<string, string>
		headers?: Record<string, string>
		user: { id: string; email: string | null }
	}): Promise<Response>
}

export const withAuth =
	(handler: WithAuthHandler) =>
	async (
		request: Request,
		{ params }: { params: Record<string, string> | undefined },
	) => {
		const searchParams = getSearchParams(request.url)

		let apiKey: string | undefined = undefined
		let headers = {}

		let accessToken = request.headers.get('Authorization') || ''
		if (!accessToken) {
			const authToken = cookies().get(
				`sb-${process.env.SUPABASE_PROJECT_ID}-auth-token`,
			)?.value

			if (authToken) {
				try {
					apiKey = JSON.parse(authToken).access_token
				} catch (error) {
					console.error(error.message)
					console.log('fail parse access token JSON')
				}
			}
		}

		if (!accessToken && !apiKey) {
			return new Response('Unauthorized. Missing authorization token', {
				status: 401,
			})
		}

		if (!accessToken.includes('Bearer ') && !apiKey) {
			return new Response(
				"Misconfigured authorization header. Did you forget to add 'Bearer '?",
				{ status: 400 },
			)
		}

		if (!!accessToken && !apiKey)
			apiKey = accessToken.replace('Bearer ', '')

		const supabase = createClient()

		const { data, error } = await supabase.auth.getUser(apiKey)

		if (error || !data.user) {
			const errMsg = error
				? error.message
				: !data.user
					? 'No user data'
					: 'Unknown error'
			return new Response(`Unauthorized. ${errMsg}`, { status: 401 })
		}

		const user = await prisma.user.findFirst({
			where: { id: data.user.id },
		})

		if (!user || !user.emailVerified) {
			return new Response('Forbidden', { status: 403 })
		}

		return await handler({
			request,
			params: params || {},
			searchParams,
			user: {
				id: user.id,
				email: user.email,
			},
			headers,
		})
	}
