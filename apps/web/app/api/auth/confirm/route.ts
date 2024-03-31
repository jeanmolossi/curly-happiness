import { createClient } from '@/lib/supabase/server'
import { EmailOtpType } from '@supabase/supabase-js'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
	const { searchParams } = new URL(request.url)

	const token_hash = searchParams.get('token_hash')
	const type = searchParams.get('type') as EmailOtpType | null
	const redir = searchParams.get('redir') ?? '/'
	const redirectTo = request.nextUrl.clone()
	redirectTo.pathname = redir

	if (!(token_hash && type)) {
		redirectTo.pathname = '/?error=auth-code-error'
		return NextResponse.redirect(redirectTo)
	}

	const supabase = createClient()

	const { error } = await supabase.auth.verifyOtp({
		type,
		token_hash,
	})

	if (!error) {
		return NextResponse.redirect(redirectTo)
	}

	redirectTo.pathname = '/'
	redirectTo.searchParams.set('error', error.message)
	return NextResponse.redirect(redirectTo)
}
