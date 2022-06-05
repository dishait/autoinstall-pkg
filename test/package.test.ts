import { resolve } from 'path'
import { isPackageExists } from 'local-pkg'
import { describe, expect, it } from 'vitest'
import {
	installPkg,
	getPackageMangerName
} from '../src/package'

describe('package', () => {
	const packageMangers = ['npm', 'yarn', 'pnpm']

	it('getPackageMangerName', async () => {
		const getPackageMangerNamePromises = packageMangers.map(
			async p => {
				return await getPackageMangerName({
					cwd: resolve(__dirname, './fixture/package/' + p)
				})
			}
		)

		const packageMangerNames = await Promise.all(
			getPackageMangerNamePromises
		)
		expect(packageMangerNames).toEqual(packageMangers)
	})

	it('installPkg', async () => {
		const installPkgPromises = packageMangers.map(
			async p => {
				return await installPkg({
					name: 'koa',
					cwd: resolve(__dirname, './fixture/package/' + p)
				})
			}
		)

		await Promise.all(installPkgPromises)

		packageMangers.forEach(p => {
			expect(
				isPackageExists('koa', {
					paths: [
						resolve(__dirname, './fixture/package/' + p)
					]
				})
			).toBe(true)
		})
	})
})
