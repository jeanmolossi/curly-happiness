import { useCallback } from 'react'
import { clearTimeout } from 'timers'

export default function useDebounce<Fn extends (...args: any[]) => any>(
	fn: Fn,
	timeout = 1000,
) {
	return useCallback(debounce(fn, timeout), [])
}

export function debounce<Fn extends (...args: any[]) => any>(
	fn: Fn,
	timeout: number,
) {
	let debounceId: ReturnType<typeof setTimeout> | null = null

	return (
		args: Parameters<Fn>,
		cb?: (result: ReturnType<Fn>) => void,
	): void => {
		// clears timeout if already defined
		if (debounceId) clearTimeout(debounceId)

		// re-set timed callback
		debounceId = setTimeout(() => {
			const result = fn.call(fn, ...args)
			cb?.(result)
		}, timeout)
	}
}
