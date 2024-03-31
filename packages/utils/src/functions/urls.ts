export const getSearchParams = (url: string) => {
	let params = {} as Record<string, string>

	new URL(url).searchParams.forEach(function (value, key) {
		params[key] = value
	})

	return params
}

export const getBaseUrl = (url: string) => {
	const parsedUrl = new URL(url)
	return `${parsedUrl.protocol}//${parsedUrl.host}`
}

export const getPathname = (url: string) => {
	return new URL(url).pathname
}

export const actionsToMapObject = (
	actions: Array<{
		rel: string
		method: string
		href: string
	}>,
) => {
	const act = new Map([])

	actions.forEach(action => {
		act.set(action.rel, action)
	})

	return act
}
