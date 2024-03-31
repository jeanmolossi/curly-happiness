import { cookies } from 'next/headers'

export const authTokenFromCookies = () => {
	const cookieStore = cookies()

	const supabaseAuthToken = cookieStore.get(
		`sb-${process.env.SUPABASE_PROJECT_ID}-auth-token`,
	)?.value

	if (!supabaseAuthToken) return null

	let accessToken = ''

	try {
		const jsonToken = JSON.parse(supabaseAuthToken)
		accessToken = jsonToken.access_token
	} catch (error) {}

	if (!accessToken) {
		return null
	}

	return accessToken
}
