# autoinstall-pkg

自动安装 `npm` 包

<br />

## features 🦕

- 支持 `esmodule` 模块
- 支持 `npm`，`yarn` 和 `pnpm` 管理器

<br />
<br />

## Usage 🦖

### install

```shell
pnpm i autoinstall-pkg
```

### cli

```shell
aip -h
```

### program

```ts
import { autoInstallPkg } from "autoinstall-pkg"

autoInstallPkg() // 将扫描当前工作目录的 src 下的所有 ts 模块引入
```

```ts
// src/index.ts
import Koa from 'koa' // 引入模块不存在时将触发自动安装
```

<br />
<br />

## License

Made with [markthree](https://github.com/markthree)

Published under [MIT License](./LICENSE).


<br />