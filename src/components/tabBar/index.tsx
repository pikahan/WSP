import Taro, { useState, useEffect } from '@tarojs/taro'
import './index.scss'
import {AtTabBar} from 'taro-ui'
import {View} from '@tarojs/components'

enum tabListIndex {
  HIDDEN_DANGER,
  ENTERPRISE,
  PERSON
}

const CustomTabBar = () => {
  const [current, setCurrent] = useState(0)

  const handleClick = value => {
    setCurrent(value)
  }

  useEffect(()=>{
    let url
    switch (current) {
      case tabListIndex.HIDDEN_DANGER:
        url = '/pages/enterpriseManagement/enterpriseManagement'
        break
      case tabListIndex.ENTERPRISE:
        url = '/pages/index/index'
        break
      case tabListIndex.PERSON:
        url = '/pages/enterpriseManagement/enterpriseManagement'
        break
    }
    Taro.redirectTo({
      url: url
    })
  },[current])

  // TODO 设置气泡
  return (
    <View className="tab-bar">
      <AtTabBar
        tabList={[
          { title: '安全隐患', iconType: 'bell' , text: '100', max: 99},
          { title: '企业', iconType: 'home' },
          { title: '个人', iconType: 'user' }
        ]}
        onClick={handleClick}
        current={current}
      />
    </View>

  )
}


export default CustomTabBar

