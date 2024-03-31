import { SHORT_DOMAIN } from '@pwd/utils'
import { NextRequest } from 'next/server'

export const parse = (req: NextRequest) => {
	let domain = req.headers.get('host') as string
	domain = domain.replace('www.', '') // remove www. from domain
	if (domain === '' || domain.endsWith('.vercel.app')) {
		domain = SHORT_DOMAIN
	}

	// path is the path of the URL (e.g. pm.co/docs/handbook -> /docs/handbook)
	let path = req.nextUrl.pathname

	// fullPath is the full URL path (along with search params)
	const searchParams = req.nextUrl.searchParams.toString()
	const fullPath = `${path}?${searchParams.length > 0 ? searchParams : ''}`

	const key = decodeURIComponent(path.split('/')[1]) // key is the first path of the path (e.g. pm.co/docs/handbook -> docs)
	const fullKey = decodeURIComponent(path.slice(1)) // fullKey is the full path without the first slash

	return { domain, path, fullPath, key, fullKey }
}
