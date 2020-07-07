import Taro, { useState } from '@tarojs/taro'
import { View } from '@tarojs/components'
import  { AtForm, AtButton, AtInput } from 'taro-ui'

import './index.scss'



const Index = () => {

  const [loginData, setLoginData] = useState({
    username: '',
    password: ''
  })

  const login = () => {
    Taro.switchTab({
      url: '/pages/enterpriseManagement/enterpriseManagement'
    })
    console.log('register')

  }

  const register = () => {
    console.log('register')
  }

  const setInputValue = (key, e) => {
    setLoginData({...loginData, [key]: e.target.value})
  }

  return (
    <View className="index">
      <AtForm
        onSubmit={login}
      >
        <AtInput
          name='username'
          title='用户名'
          type='text'
          placeholder='输入用户名'
          value={loginData.username}
          onChange={e => setInputValue('username', e)}
        />
        <AtInput
          name='password'
          title='密码'
          type='password'
          placeholder='输入密码'
          value={loginData.password}
          onChange={e => setInputValue('password', e)}
        />
        <View className="btn-group-item">
          <AtButton type='primary' formType='submit'>提交</AtButton>

        </View>
        <View className="btn-group-item">
          <AtButton onClick={register} >注册</AtButton>
        </View>

      </AtForm>
    </View>
  )
}


export default Index

