import { detect } from '@antfu/ni'
import { execaCommand } from 'execa'
import { isPackageExists } from 'local-pkg'

interface GetPackageMangerNameOptions {
	cwd?: string
	autoInstallPkgManager?: boolean
}

export async function getPackageMangerName(
	options?: GetPackageMangerNameOptions
) {
	const {
		cwd = process.cwd(),
		autoInstallPkgManager = true
	} = options || {}

	const packageMangerName = await detect({
		cwd,
		autoInstall: autoInstallPkgManager
	})

	return packageMangerName
}

interface InstallPkgOptions {
	name: string
	/**
	 * @default process.cwd()
	 */
	cwd?: string
	/**
	 * @default true
	 */
	autoInstallPkgManager?: boolean
}

export async function installPkg(
	options: InstallPkgOptions
) {
	const { name, cwd = process.cwd() } = options

	if (isPackageExists(name, { paths: [cwd] })) {
		return
	}

	const packageMangerName = await getPackageMangerName(
		options
	)

	const command =
		packageMangerName === 'npm' ? 'install' : 'add'
	const installCommand = `${packageMangerName} ${command} ${name}`

	await execaCommand(installCommand, {
		cwd,
		stdio: 'inherit',
		encoding: 'utf-8'
	})
}
