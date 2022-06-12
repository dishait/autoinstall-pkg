import cac from 'cac'
import { autoInstallPkg } from './index'
import { version } from '../package.json'

const cli = cac('aip')

cli
	.command('[...paths]', '扫描目录路径')
	.option('-c --cwd', '工作目录', {
		default: process.cwd()
	})
	.option(
		'-a --autoInstallPkgManager',
		'当包管理器不存在时，自动安装',
		{
			default: true
		}
	)
	.action((paths, options) => {
		autoInstallPkg({
			cwd: options.cwd,
			paths: paths.length ? paths : 'src/**/*.ts',
			autoInstallPkgManager: options.autoInstallPkgManager
		})
	})

cli.help()
cli.version(version)

cli.parse()
