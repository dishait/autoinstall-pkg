import {
	scanStaticImports,
	scanNoBuiltinPkg
} from '../src/scan'
import { describe, expect, it } from 'vitest'

describe('scan', () => {
	it('scanStaticImports', async () => {
		const result = await scanStaticImports(
			'test/fixture/foo.ts'
		)
		expect(result).toMatchInlineSnapshot(`
			[
			  {
			    "code": "import 'koa'
			",
			    "end": 14,
			    "imports": undefined,
			    "specifier": "koa",
			    "start": 0,
			    "type": "static",
			  },
			  {
			    "code": "import Test from 'express'
			",
			    "end": 57,
			    "imports": "Test ",
			    "specifier": "express",
			    "start": 29,
			    "type": "static",
			  },
			  {
			    "code": "import { foo3 } from './foo3'
			",
			    "end": 88,
			    "imports": "{ foo3 } ",
			    "specifier": "./foo3",
			    "start": 57,
			    "type": "static",
			  },
			  {
			    "code": "import { foo2 } from './foo2'
			",
			    "end": 119,
			    "imports": "{ foo2 } ",
			    "specifier": "./foo2",
			    "start": 88,
			    "type": "static",
			  },
			]
		`)
	})

	it('scanNoBuiltinPkg', async () => {
		const result = await scanNoBuiltinPkg(
			'test/fixture/foo.ts'
		)

		expect(result).toMatchInlineSnapshot(`
			[
			  "koa",
			  "express",
			]
		`)
	})
})
