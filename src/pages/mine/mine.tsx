// import Taro, { useState } from '@tarojs/taro'
import Taro from '@tarojs/taro'
import {Button, Image, Text, View} from '@tarojs/components'
import  { AtList, AtListItem } from 'taro-ui'

import './mine.scss'
import {useSelector} from '@tarojs/redux'
import {RootState} from '../../reducers'



const Mine = () => {

  const handleUserManagement = () => {
    Taro.navigateTo({
      url: '/pages/userManagement/userManagement'
    })
  }

  const handleLogout = () => {
    Taro.removeStorageSync("userInfo")
    Taro.navigateTo({
      url: '/pages/index/index'
    })
  }
  const userData = useSelector((state: RootState) => state.user.userData)
  const handleClickMineEnterprise = () => {
    Taro.navigateTo({
      url: `/pages/enterpriseDetail/enterpriseDetail?id=${userData.enterpriseId}`
    })
  }

  return (
    <View className="mine">
      <View className="mine_top">
        <Text className="mine_top-name">
          {userData.username}
        </Text>
        <View className="mine_top-image-wrapper">
          <Image
            src={require('../../image/icon.jpg')}
          />
        </View>
      </View>
        <AtList className="mine_list" hasBorder={false}>
          <AtListItem
            onClick={handleClickMineEnterprise}
            title='我的企业'
          />
          <AtListItem
            title='密码修改'
          />
        </AtList>
        <AtList className="mine_list" hasBorder={false}>
          <AtListItem
            title='企业管理'
          />
          <AtListItem
            onClick={handleUserManagement}
            title='用户管理'
          />
        </AtList>
      <Button type="warn" onClick={handleLogout}>退出登录</Button>
    </View>
  )
}


export default Mine

