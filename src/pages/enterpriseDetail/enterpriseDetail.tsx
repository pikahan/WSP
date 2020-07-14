import Taro, { useState, useRouter, useEffect } from '@tarojs/taro'
import './enterpriseDetail.scss'
import {View} from '@tarojs/components'
import {AtForm, AtMessage, AtInput, AtListItem, AtButton} from 'taro-ui'
import {REQUEST_URL} from '../../constants/counter'
import {fetchData} from '../../actions/enterprise'
import {useDispatch} from '@tarojs/redux'


const EnterpriseDetail = () => {
  // const [showAddBtn, setShowAddBtn] = useState(true)

  const [formData, setFormData] = useState({
    name: '',
    legalPerson: '',
    code: '',
    staff: '',
    staffPhone: '',
    address: '',
    longitude: 0,
    latitude: 0
  })

  const setFormValue = (key, value) => {
    setFormData({...formData, [key]: value})
  }
  const dispatch = useDispatch()

  const handleSubmit = () => {
    console.log(formData)
    Taro.request({
      url: `${REQUEST_URL}add/enterprise`,
      method: 'POST',
      data: JSON.stringify(formData),
      header: {'content-type': 'application/json;charset=utf-8'},
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
      url: `${REQUEST_URL}enterprise/${router.params.id}`,
      method: 'GET',
      complete(res) {
        let { data,  statusCode} = res as any
        if (statusCode === 200) {
          console.log(data)
          setFormData(data.data)
        }
      }
    })

  }, [])

  const handleListItemClick = () => {
    if (btnDisabled) { // 通过list进入的页面, 所以handleListItemClick要执行显示地理位置
      Taro.openLocation({
        latitude: formData.latitude,
        longitude: formData.longitude
      })
    } else { // 通过add button进入的页面, 所以handleListItemClick要执行选择地理位置
      Taro.chooseLocation({
        success({ address, latitude, longitude }) {
          console.log(address, latitude, longitude)
          setFormData({...formData, address, latitude: parseFloat(latitude), longitude: parseFloat(longitude)})
        }
      })
    }
  }

  return (
    <View className="enterprise-detail">
      <AtMessage />
      <AtForm
        onSubmit={handleSubmit}
      >
        <AtInput
          name='name'
          title='企业名称'
          type='text'
          placeholder='输入企业名称'
          value={formData.name}
          onChange={value => setFormValue('name', value)}
          disabled={btnDisabled}
        />
        <AtInput
          name='code'
          title='信用代码'
          type='text'
          placeholder='输入信用代码'
          value={formData.code}
          onChange={value => setFormValue('code', value)}
          disabled={btnDisabled}
        />
        <AtInput
          name='legalPerson'
          title='法人'
          type='text'
          placeholder='输入法人'
          value={formData.legalPerson}
          onChange={value => setFormValue('legalPerson', value)}
          disabled={btnDisabled}
        />
        <AtInput
          name='staff'
          title='联络人员'
          type='text'
          placeholder='输入联络人'
          value={formData.staff}
          onChange={value => setFormValue('staff', value)}
          disabled={btnDisabled}
        />
        <AtInput
          name='staffPhone'
          title='联络人电话'
          type='text'
          placeholder='输入电话'
          value={formData.staffPhone}
          onChange={value => setFormValue('staffPhone', value)}
          disabled={btnDisabled}
        />
        <View className="list_item">
          <AtListItem
            title="地址"
            extraText={formData.address}
            onClick={handleListItemClick}
          />

        </View>
        <View className="form-submit_btn">
          {
            !btnDisabled &&
            <AtButton type='primary' formType="submit">添加</AtButton>
          }
        </View>
      </AtForm>
    </View>
  )
}

EnterpriseDetail.config = {
  navigationBarTitleText: '企业'
}

export default EnterpriseDetail

