import { NextRequest, NextResponse } from 'next/server'
import { supabaseMiddleware } from '../supabase/middleware'
import { parse } from './utils'

export default async function AppMiddleware(req: NextRequest) {
	console.log('Is AppMiddleware')
	const { domain, path } = parse(req)

	const supabase = await supabaseMiddleware(req)

	const {
		data: { user },
		error,
	} = await supabase.auth.getUser()

	// if user try to access dashboard protected routes
	// move to root path with error message
	if (path.startsWith('/dashboard') && (!user || error)) {
		if (error) {
			return NextResponse.redirect(
				new URL(`/?error=${error.message}`, req.url),
			)
		}

		return NextResponse.redirect(new URL('/', req.url))
	}

	// if user already has logged in and try to access
	// login routes, move it to dashboard
	if (['/', '/registrar'].includes(path) && !!user) {
		const url = new URL('/dashboard', req.url)
		return NextResponse.redirect(url)
	}

	return NextResponse.next()
}
