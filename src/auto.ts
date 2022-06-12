import { resolve } from 'path'
import { watch } from 'chokidar'
import { debounce } from './shared'
import { installPkg } from './package'
import { scanNoBuiltinPkg } from './scan'

interface AutoInstallPkgOptions {
	/**
	 * @default process.cwd()
	 */
	cwd?: string
	/**
	 * @TODO
	 * @default true
	 */
	autoUninstall?: boolean
	/**
	 * 当包管理器不存在时，自动安装
	 * @default true
	 */
	autoInstallPkgManager?: boolean
	/**
	 * 路径
	 * @default "src/**\\/*.ts"
	 */
	paths: string | readonly string[]
	/**
	 * 安装回调
	 */
	onInstalling?: (pkg: string) => void
}

export async function autoInstallPkg(
	options?: AutoInstallPkgOptions
) {
	const {
		onInstalling,
		paths = 'src/**/*.ts',
		cwd = process.cwd(),
		autoInstallPkgManager = true
	} = options || {}

	const watcher = watch(paths, {
		cwd,
		ignoreInitial: false
	})

	const cache = new Set<string>()

	const install = async (path: string) => {
		const pkgs = await scanNoBuiltinPkg(resolve(cwd, path))

		for (const pkg of pkgs) {
			if (!cache.has(pkg)) {
				if (onInstalling) {
					onInstalling(pkg)
				}
				await installPkg({
					cwd,
					name: pkg,
					autoInstallPkgManager
				})
			}
		}
		pkgs.forEach(pkg => cache.add(pkg))
	}

	const debouncedInstall = debounce(install, 1000)

	watcher.on('add', debouncedInstall)

	watcher.on('change', debouncedInstall)
}
