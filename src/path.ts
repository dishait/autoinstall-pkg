import { normalize } from 'path'
import { isNodeBuiltin } from 'mlly'

export const slash = (path: string) =>
	path.replace(/\\/g, '/')

export const normalizedSlash = (path: string) =>
	slash(normalize(path))

export const pathToPkg = (path: string) => {
	// 相对路径时直接退出
	if (path.startsWith('.') || path.startsWith('..')) {
		return null
	}

	path = normalizedSlash(path)

	// 可能是命名空间包
	if (path.startsWith('@')) {
		return path
	}

	return path.split(/\//)[0]
}

export const pathToNoBuiltinPkg = (path: string) => {
	const pkg = pathToPkg(path)
	if (pkg && isNodeBuiltin(pkg)) {
		return null
	}
	return pkg
}
