# 使用IDE创建工程



![1559225470979](assets/1559225470979.png)

![1559225494993](assets/1559225494993.png)

# 定义模板

```tsx
import * as React from 'react';
const initialState = {}
interface IProps extends React.HTMLAttributes<HTMLDivElement> {}
type State = typeof initialState
class ${NAME} extends React.Component<IProps, State> {
	public state: State = initialState
	public render() {
		return (
			<div className="${NAME}">
				${NAME}
			</div>
		);
	}
}
export default ${NAME}
```

# 没有定义类型，默认any

```json
"noImplicitAny": false,
```

# Axios

## 封装

安装

```shell
$ yarn add axios qs @types/qs -S
```

> axios:发送HTTP请求工具[【文档】](http://www.axios-js.com/)
>
> qs:URL转换工具[【文档】](https://www.npmjs.com/package/qs)
>
> @types/qs：qs库默认不支持在ts文件中使用，@types包中都是支持ts的一些库

封装中将会使用type类型，工程里的tslink，不建议使用type，在这里配置一下

**tslint.json**

```json
"rules": {
    "interface-over-type-literal": false
}
```

> 遇见一些tslink的问题都可以在[【文档】](https://palantir.github.io/tslint/)中查找

**axios-config.js**

```js
import axios from 'axios'

const service = axios.create({
    baseURL: '',
    timeout: 2500
})
service.interceptors.request.use(config => {
    return config;
}, error => {
    return Promise.reject(error)
})
service.interceptors.response.use(res => {
    return res.data.result
}, error => {
    return Promise.reject(error)
})
export default service
```

**axios.ts**

```tsx
import * as qs from 'qs'
import axios from './axios-config'
type MethodType = (typeof MethodTypes)[number]
declare const MethodTypes: ['get', 'post', 'delete', 'put']
declare type  parms = {
  url: string,
  args?: any,
  method?: MethodType
}
export default class Axios<T> {
  private url: string
  private args: {}
  private method: MethodType
  constructor({url, args = {}, method = 'get'}: parms) {
    this.url = url;
    this.args = args;
    this.method = method;
  }
  public ajax = (): Promise<T> => new Promise<T>((resolve, reject) => {
    let promise
    let {url} = this
    const {args, method} = this
    if (method === 'get') {
      if (args !== {}) {
        url = url + '?' + qs.stringify(args)
      }
      promise = axios.get(url)
    } else {
      promise = axios[`${method}`](url, {data: args})
    }
    promise.then((res: T) => {
      resolve(res)
    }, err => {
      reject(err)
    })
  })
}
```

## 使用

定义一个json来模拟后端给的数据

**public/api/Admin.json**

```json
{
  "code": 1,
  "message": "success",
  "result": {
    "id": 1,
    "name": "xxx"
  }
}
```

根据这个数据定义接口

**model/i-admin-model.ts**

```ts
export default interface IAdminModel {
  id: number
  name: string
}
```

定义一个api

**api/admin-api.ts**

```ts
import IAdminModel from "../model/i-admin-model";
import Axios from "../util/axios/axios";

export default class AdminApi {
    public static getAdmin = () => new Axios<IAdminModel>({url: '/api/AdminApi.json'}).ajax()
}
```

tslink中默认将控制台输出禁用了，无法使用 `console.log();`，这里需要配置一下，代码如下：

```json
 "rules": {
    "no-console": false
  }
```

**Admin.tsx**

```tsx
import * as React from 'react';
import AdminApi from "../api/admin-api";
class Admin extends React.Component {
    public async componentWillMount() {
        const iAdminModel = await AdminApi.getAdmin();
        console.log(iAdminModel);
    }

    public render() {
        return (
            <div className="Admin">
                Admin
            </div>
        );
    }
}
export default Admin;
```

# 路径优化

前面的代码，导入工具包、数据模型等等，随着页面的复杂性，会变成`import xx from '../../../..'`，这里教读者一个办法。



安装

```shell
$ yarn add react-app-rewired@1.6.2 -D
```

> 给路径加别名，需要在webpack中进行配置，但这个工程里没有暴露配置，可以通过react-app-rewired插件来配置[【文档】](http://npm.taobao.org/package/react-app-rewired)

**package.json**

```json
"scripts": {
    "start": "react-app-rewired start --scripts-version react-scripts-ts",
    "build": "react-app-rewired build --scripts-version react-scripts-ts",
    "test": "react-app-rewired test --env=jsdom --scripts-version react-scripts-ts",
    "eject": "react-scripts-ts eject"
  },
```

**config-overrides.js**

```js
const path = require('path')
module.exports = function override(config, env) {
    config.resolve.alias = {
        ...config.resolve.alias,
        '@api': path.resolve(__dirname, 'src/api'),
        '@model': path.resolve(__dirname, 'src/model'),
        '@util': path.resolve(__dirname, 'src/util'),
    }
    return config;
}

```

**tslint.json**

```json
 "rules": {
    "interface-over-type-literal": false,
    "no-console": false,
+   "no-implicit-dependencies": ["optional", ["src"]]
  }

```

**tsconfig.json**

```json
{
  "compilerOptions": {
    "paths": {
      "@api/*": ["./src/api/*"],
      "@model/*": ["./src/model/*"],
      "@util/*": ["./src/util/*"]
    }
  }
}
```

这样就完成了，以后你在需要使用`import`时，就这样写：

```js
import AdminApi from "@api/admin-api";
import IAdminModel from "@model/i-admin-model";
import Axios from "@util/axios/axios";
```

# 使用Antd UI

安装

```shell
$ yarn add antd -S
$ yarn add ts-import-plugin react-app-rewired@1.6.2 react-app-rewire-less -D
```

**config-overrides.js**

```js
const path = require('path')
const tsImportPluginFactory = require('ts-import-plugin');
const {getLoader} = require('react-app-rewired');
const rewireLess = require('react-app-rewire-less');
module.exports = function override(config, env) {
    config.resolve.alias = {
        ...config.resolve.alias,
        '@api': path.resolve(__dirname, 'src/api'),
        '@model': path.resolve(__dirname, 'src/model'),
        '@util': path.resolve(__dirname, 'src/util'),
    }
    const tsLoader = getLoader(
        config.module.rules,
        rule => rule.loader && typeof rule.loader === 'string' && rule.loader.includes('ts-loader')
    );
    tsLoader.options = {
        getCustomTransformers: () => ({
            before: [
                tsImportPluginFactory({
                    libraryDirectory: 'es',
                    libraryName: 'antd',
                    style: true,
                }),
            ],
        }),
    };
    config = rewireLess.withLoaderOptions({
        javascriptEnabled: true,
        modifyVars: {
            '@primary-color': '#1DA57A', // 主题色
        },
    })(config, env);
    return config;
}
```

**App.tsx**

```tsx
import AdminAPI from "@api/admin-api";
import {Button} from "antd";
import * as React from 'react';
class App extends React.Component {
    public async componentWillMount() {
        const iAdminModel = await AdminAPI.getAdmin();
        console.log(iAdminModel);
    }
    public render() {
        return (
            <div className="App">
                <Button type='primary'>Button</Button>
            </div>
        );
    }
}
export default App;
```

# 使用styled-components

> 使用react开发，一定会有这样的场景，为了一个组件，去设置样式，可能会影响到其他的组件，通过styled-components，可以使样式变成局部的

[【中文文档】](https://github.com/XieDongcheng4/styled-components-docs-zh)[【官方文档】](https://www.styled-components.com/docs)

安装

```shell
$ yarn add styled-components @types/styled-components -S
```

运行的时候如果控制台出现

```shell
(36,15): error TS2300: Duplicate identifier 'FormData'.
```

> 在工程中的node_modules\@types\react-native，把这个文件删除

**styled.ts**

```ts
import styled from 'styled-components'
export const Button = styled.div`
  height: ${(props: { height: string }) => props.height};
  width: 100px;
`
```

**StyledComponentDemo.tsx**

```tsx
import * as React from 'react';
import {Button} from "./css/styled";
const initialState = {}
interface IProps extends React.HTMLAttributes<HTMLDivElement> {}
type State = typeof initialState
class StyledComponentDemo extends React.Component<IProps, State> {
    public state: State = initialState
    public render() {
        return (
            <div className="StyledComponentDemo">
                <Button height="1px">123</Button>
            </div>
        );
    }
}
export default StyledComponentDemo
```

全局样式

**global-styled.ts**

```ts
import {createGlobalStyle} from 'styled-components'

export default createGlobalStyle`
        html, body, div, span, applet, object, iframe,
    h1, h2, h3, h4, h5, h6, p, blockquote, pre,
    a, abbr, acronym, address, big, cite, code,
    del, dfn, em, img, ins, kbd, q, s, samp,
    small, strike, strong, sub, sup, tt, var,
    b, u, i, center,
    dl, dt, dd, ol, ul, li,
    fieldset, form, label, legend,
    table, caption, tbody, tfoot, thead, tr, th, td,
    article, aside, canvas, details, embed, 
    figure, figcaption, footer, header, hgroup, 
    menu, nav, output, ruby, section, summary,
    time, mark, audio, video {
        margin: 0;
        padding: 0;
        border: 0;
        font-size: 100%;
        font: inherit;
        vertical-align: baseline;
    }
    /* HTML5 display-role reset for older browsers */
    article, aside, details, figcaption, figure, 
    footer, header, hgroup, menu, nav, section {
        display: block;
    }
    body {
        line-height: 1;
    }
    ol, ul {
        list-style: none;
    }
    blockquote, q {
        quotes: none;
    }
    blockquote:before, blockquote:after,
    q:before, q:after {
        content: '';
        content: none;
    }
    table {
        border-collapse: collapse;
        border-spacing: 0;
    }
`
```

**App.tsx**

```tsx
import AdminApi from "@api/admin-api";
import * as React from 'react';
import StyledComponentDemo from "./component/StyledComponentDemo/StyledComponentDemo";
import GlobalCSS from './global-styled'

class App extends React.Component {
    public async componentWillMount() {
        const iAdminModel = await AdminApi.getAdmin();
        console.log(iAdminModel);
    }

    public render() {
        return (
            <div className="App">
                <StyledComponentDemo/>
                <GlobalCSS/>
            </div>
        );
    }
}
export default App;
```

