import {
	slash,
	pathToPkg,
	normalizedSlash,
	pathToNoBuiltinPkg
} from '../src/path'

import { describe, expect, it } from 'vitest'

describe('path', () => {
	it('slash', () => {
		expect(slash(`foo\\bar`)).toMatchInlineSnapshot(
			'"foo/bar"'
		)
	})

	it('normalizedSlash', () => {
		expect(
			normalizedSlash(
				`D:\\Code\\Work\\autoinstall-pkg\\test\\path.test.ts`
			)
		).toMatchInlineSnapshot(
			'"D:/Code/Work/autoinstall-pkg/test/path.test.ts"'
		)

		expect(
			normalizedSlash(
				`D:\\Code\\\\Work\\\\autoinstall-pkg\\test\\path.test.ts`
			)
		).toMatchInlineSnapshot(
			'"D:/Code/Work/autoinstall-pkg/test/path.test.ts"'
		)

		// 相对路径
		expect(
			normalizedSlash(`../examples`)
		).toMatchInlineSnapshot('"../examples"')
		expect(
			normalizedSlash(`./examples`)
		).toMatchInlineSnapshot('"examples"')
	})

	it('pathToPkg', () => {
		// node 模块
		expect(pathToPkg(`fs`)).toMatchInlineSnapshot('"fs"')

		// 第三方模块
		expect(pathToPkg(`foo/bar`)).toMatchInlineSnapshot(
			'"foo"'
		)

		// 相对路径返回空
		expect(
			pathToPkg('./examples/foo')
		).toMatchInlineSnapshot('null')

		expect(
			pathToPkg('../examples/foo')
		).toMatchInlineSnapshot('null')
	})

	it('pathToPkg', () => {
		// node 模块
		expect(pathToPkg(`fs`)).toMatchInlineSnapshot('"fs"')

		// 第三方模块
		expect(pathToPkg(`foo`)).toMatchInlineSnapshot('"foo"')
		expect(pathToPkg(`foo/bar`)).toMatchInlineSnapshot(
			'"foo"'
		)

		// 相对路径返回空
		expect(
			pathToPkg('../examples/foo')
		).toMatchInlineSnapshot('null')
	})

	it('pathToNoBuiltinPkg', () => {
		// node 模块
		expect(pathToNoBuiltinPkg(`fs`)).toMatchInlineSnapshot(
			'null'
		)

		// 非 node 模块
		expect(pathToNoBuiltinPkg(`foo`)).toMatchInlineSnapshot(
			'"foo"'
		)
		expect(
			pathToNoBuiltinPkg(`foo/bar`)
		).toMatchInlineSnapshot('"foo"')

		// 相对路径
		expect(
			pathToNoBuiltinPkg(`../examples/foo`)
		).toMatchInlineSnapshot('null')

		expect(
			pathToNoBuiltinPkg(`./examples/foo`)
		).toMatchInlineSnapshot('null')
	})
})
