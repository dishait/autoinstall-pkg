import { autoInstallPkg } from 'autoinstall-pkg'

autoInstallPkg({
	cwd: __dirname,
	paths: './src/**/*.ts'
})
