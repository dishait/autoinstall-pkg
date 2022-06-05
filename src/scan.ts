import { extname } from 'path'
import { readFile } from 'fs/promises'
import { findStaticImports } from 'mlly'
import { pathToNoBuiltinPkg } from './path'

export async function scanStaticImports(path: string) {
	if (extname(path) !== '.ts') {
		path = path + '.ts'
	}
	const module = await readFile(path, {
		encoding: 'utf-8'
	})

	return findStaticImports(module)
}

export async function scanNoBuiltinPkg(path: string) {
	const staticImports = await scanStaticImports(path)

	const pkgs = staticImports
		.map(imports => imports.specifier)
		.filter(specifier => pathToNoBuiltinPkg(specifier))

	return Array.from(new Set(pkgs))
}
