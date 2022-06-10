import { mkdist } from 'mkdist'
import { defineConfig } from 'tsup'

// 编译 cli
mkdist({
	format: 'cjs',
	pattern: 'cli.ts'
})

export default defineConfig({
	dts: true,
	clean: true,
	minify: true,
	outDir: 'dist',
	splitting: true,
	noExternal: ['execa'],
	format: ['cjs', 'esm'],
	entry: ['src/index.ts']
})
