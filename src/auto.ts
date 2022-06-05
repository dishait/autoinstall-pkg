import { watch } from 'chokidar'
import { installPkg } from './package'
import { scanNoBuiltinPkg } from './scan'

interface AutoInstallPkgOptions {
	cwd?: string
	autoInstallPkgManager?: boolean
	paths: string | readonly string[]
}

export async function autoInstallPkg(
	options: AutoInstallPkgOptions
) {
	const {
		paths = 'src',
		cwd = process.cwd(),
		autoInstallPkgManager = true
	} = options
	const watcher = watch(paths)

	const cache = new Set<string>()

	watcher.on('change', async path => {
		const pkgs = await scanNoBuiltinPkg(path)

		for (const pkg of pkgs) {
			if (!cache.has(pkg)) {
				await installPkg({
					cwd,
					name: pkg,
					autoInstallPkgManager
				})
			}
		}
		pkgs.forEach(pkg => cache.add(pkg))
	})
}
