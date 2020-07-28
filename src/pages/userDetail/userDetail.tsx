import Taro, { useState, useRouter, useEffect } from '@tarojs/taro'
import './userDetail.scss'
import {View, Picker, Button} from '@tarojs/components'
import {AtForm, AtMessage, AtInput, AtListItem, AtButton, AtList} from 'taro-ui'
import {REQUEST_URL} from '../../constants/counter'
import {useDispatch} from '@tarojs/redux'
import {fetchData} from '../../actions/user'

const type = ['员工', '管理员', '安管员', '安管负责人', '应急局人员']
const UserDetail = () => {
  // const [showAddBtn, setShowAddBtn] = useState(true)
  const [typeIndex, setTypeIndex] = useState(0)
  const handleTypeChange = e => {
    setTypeIndex(e.detail.value*1)
    setFormValue('userTypeId', e.detail.value*1)
  }
  const [formData, setFormData] = useState({
    username: '',
    userTypeId: 0,
    enterpriseId: 1,
    enterpriseName: '能力有限公司',
    password: ''
  })

  const setFormValue = (key, value) => {
    setFormData({...formData, [key]: value})
  }
  const dispatch = useDispatch()

  const handleSubmit = () => {
    console.log(formData)
    Taro.request({
      url: `${REQUEST_URL}register`,
      method: 'POST',
      data: JSON.stringify(formData),
      complete(res) {
        console.log(res)
        let { data,  statusCode} = res as any
        if (statusCode === 200) {
            console.log(data)
          dispatch(fetchData())
          Taro.navigateBack({
            delta: 1
          })
        }
      }
    })

  }

  let [btnDisabled, setBtnDisabled] = useState(false)


  const router = useRouter()
  useEffect(() => {
    // 路径参数
    console.log(router.params)
    if (typeof router.params.id === 'undefined') {
      return
    }

    setBtnDisabled(true)

    Taro.request({
      url: `${REQUEST_URL}user/${router.params.id}`,
      method: 'GET',
      complete(res) {
        let { data,  statusCode} = res as any
        if (statusCode === 200) {
          console.log(data)
          const {username, enterpriseId, userTypeId} = data.data
          setTypeIndex(userTypeId)
          setFormData({ username, enterpriseId, userTypeId, enterpriseName: '能力有限公司', password: '' })
        }
      }
    })
  }, [])

  const handleUpdate = () => {
    console.log('formdata')
    console.log(formData)
    let { password, ...restData } = formData
    Taro.request({
      url: `${REQUEST_URL}update/user`,
      data: JSON.stringify({...restData, id: router.params.id}),
      method: 'POST',
      complete(res) {
        let { data,  statusCode} = res as any
        if (statusCode === 200) {
          console.log(data)
          dispatch(fetchData())
          Taro.navigateBack({
            delta: 1
          })
        }
      }
    })
  }

  const handleDelete = () => {
    Taro.request({
      url: `${REQUEST_URL}delete/user/${router.params.id}`,
      method: 'GET',
      complete(res) {
        let { data,  statusCode} = res as any
        if (statusCode === 200) {
          console.log(data)
          dispatch(fetchData())
          Taro.navigateBack({
            delta: 1
          })
        }
      }
    })
  }

  return (
    <View className="enterprise-detail">
      <AtMessage />
      <AtForm
        onSubmit={handleSubmit}
      >
        <AtInput
          name='username'
          title='用户名'
          type='text'
          placeholder='输入用户名'
          value={formData.username}
          onChange={value => setFormValue('username', value)}
        />
        {
          !btnDisabled &&
          <AtInput
            name='password'
            title='密码'
            type='password'
            placeholder='输入密码'
            value={formData.password}
            onChange={value => setFormValue('password', value)}
          />        }

        <AtInput
          name='enterpriseName'
          title='企业名称'
          type='text'
          placeholder='输入企业名称'
          value={formData.enterpriseName}
          onChange={value => setFormValue('enterpriseName', value)}
        />



        <Picker
          mode='selector'
          range={type}
          onChange={handleTypeChange}
          value={typeIndex}>
          <AtList>
            <AtListItem
              title='类别'
              extraText={type[typeIndex]}
            />
          </AtList>
        </Picker>

        <View className="form-submit_btn">
          {
            !btnDisabled &&
            <AtButton type='primary' formType="submit">添加</AtButton>
          }
          {
            btnDisabled &&
              <View>
                <AtButton className="user-submit-btn" type='primary' onClick={handleUpdate} >修改</AtButton>
                <Button  className="user-submit-btn" type="warn" onClick={handleDelete}>删除</Button>
              </View>
          }
        </View>
      </AtForm>
    </View>
  )
}

UserDetail.config = {
  navigationBarTitleText: 'user'
}

export default UserDetail

