export const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME || 'Password Manager'
export const SHORT_DOMAIN = process.env.NEXT_PUBLIC_SHORT_DOMAIN || 'pm.co'
export const HOME_DOMAIN = `https://${process.env.NEXT_PUBLIC_APP_DOMAIN}`

export const APP_DOMAIN =
	process.env.NEXT_PUBLIC_VERCEL_ENV === 'production'
		? `https://${process.env.NEXT_PUBLIC_APP_DOMAIN}`
		: process.env.NEXT_PUBLIC_VERCEL_ENV === 'preview'
			? `https://preview.${process.env.NEXT_PUBLIC_APP_DOMAIN}`
			: `http://localhost:3000`

export const APP_HOSTNAMES = new Set([
	`app.${process.env.NEXT_PUBLIC_APP_DOMAIN}`,
	`preview.${process.env.NEXT_PUBLIC_APP_DOMAIN}`,
	`localhost:3000`,
	`localhost`,
])

export const ADMIN_HOSTNAMES = new Set([
	`admin.${process.env.NEXT_PUBLIC_APP_DOMAIN}`,
	`admin.localhost:3000`,
	`dashboard.${process.env.NEXT_PUBLIC_APP_DOMAIN}`,
	`dashboard.localhost:3000`,
])
