import type { AnyFunction } from 'm-type-tools'

export function debounce<T extends AnyFunction>(
	fn: T,
	delay = 200
) {
	let timeout: NodeJS.Timeout

	return function (...rest: Parameters<T>) {
		clearTimeout(timeout)
		timeout = setTimeout(() => {
			fn.apply(rest)
		}, delay)
	} as T
}
