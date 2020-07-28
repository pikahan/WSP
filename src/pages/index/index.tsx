import Taro, { useState } from '@tarojs/taro'
import { View } from '@tarojs/components'
import  { AtForm, AtButton, AtInput } from 'taro-ui'

import './index.scss'
import {useDispatch} from '@tarojs/redux'
import useEffect = Taro.useEffect
import {setUserData} from '../../actions/user'
import {REQUEST_URL} from '../../constants/counter'
import {fetchData} from '../../actions/enterprise'



const Index = () => {

  const dispatch = useDispatch()
  useEffect(() => {
    const userInfo = Taro.getStorageSync("userInfo")
    if (userInfo) {
      dispatch(setUserData(userInfo))
      Taro.switchTab({
        url: '/pages/safetyHazard/safetyHazard',

      })
    }
    console.log(userInfo)
  }, [])

  const [loginData, setLoginData] = useState({
    username: '',
    password: ''
  })

  const login = () => {

    console.log(loginData)

    Taro.request({
      url: `${REQUEST_URL}login`,
      method: 'POST',
      data: JSON.stringify(loginData),
      header: {'content-type': 'application/json;charset=utf-8'},
      complete(res) {
        console.log(res)
        let { data,  statusCode} = res as any
        if (statusCode === 200) {
          console.log(data)
          // dispatch(setUserData(userInfo))
          dispatch(setUserData({
            username: 'admin',
            userType: '管理员',
            enterpriseId: 1
          }))
          Taro.setStorageSync('userInfo', {
            username: 'Admin',
            userType: '管理员',
            enterpriseId: 1
          })

        }
      }
    })
    Taro.switchTab({
      url: '/pages/safetyHazard/safetyHazard',
    })
    console.log('register')

  }

  const register = () => {
    console.log('register')
  }

  const setInputValue = (key, e) => {
    setLoginData({...loginData, [key]: e})
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

