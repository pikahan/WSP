import Taro, { Component, Config } from '@tarojs/taro'
import { StoreContext } from 'redux-react-hook'
import 'taro-ui/dist/style/index.scss'
import Index from './pages/index'

import configStore from './store'

import './app.scss'

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

const store = configStore()

class App extends Component {

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    pages: [
      'pages/index/index',
      'pages/enterpriseManagement/enterpriseManagement',
      'pages/personManagement/personManagement'
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'black'
    },
    tabBar: {
      list: [
        {
          pagePath: 'pages/enterpriseManagement/enterpriseManagement',
          text: '安全隐患',
          iconPath: 'image/safety.png',
          selectedIconPath: 'image/safety_focused.png'
        },
        {
          pagePath: 'pages/index/index',
          text: '企业',
          iconPath: 'image/enterprise.png',
          selectedIconPath: 'image/enterprise_focused.png'
        },
        {
          pagePath: 'pages/personManagement/personManagement',
          text: '个人',
          iconPath: 'image/user.png',
          selectedIconPath: 'image/user_focused.png'
        }
      ]
    }
  }

  componentDidMount () {}

  componentDidShow () {}

  componentDidHide () {}

  componentDidCatchError () {}

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render () {
    return (
      <StoreContext.Provider value={store}>
        <Index />
      </StoreContext.Provider>
    )
  }
}

Taro.render(<App />, document.getElementById('app'))
