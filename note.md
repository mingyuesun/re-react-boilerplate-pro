# 之于原始版本的坑

## 依赖

connected-react-router@^4.5.0[✔]
connected-react-router@^6.8.0[×]

react-redux@^5.1.0[✔]
react-redux@^7.2.1[×]

```js
react-dom.development.js?f8c1:19527 The above error occurred in the <ConnectedRouter> component:
    in ConnectedRouter (created by Context.Consumer)
    in ConnectedRouterWithContext (created by ConnectFunction)
    in ConnectFunction (created by Router)
    in Router (created by ConnectFunction)
    in ConnectFunction
    in Provider

```

## antd/icon

[https://ant.design/components/icon-cn/](https://ant.design/components/icon-cn/)

antd 4.5 以下使用：
```js
import { Icon } from 'antd'

class Component extends React.Component {
    render(){
        return(
            <div>
              <Icon type="user">
            </div>
        )
    }
}
```

antd 4.5 以上使用：

```bash
$ npm install --save @ant-design/icons
```

```js
import { UserOutlined } from '@ant-design/icons'
class Component extends React.Component {
    render(){
        return(
            <div>
              <UserOutlined/>
            </div>
        )
    }
}
```
