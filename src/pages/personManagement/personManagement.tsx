import Taro, { useState } from '@tarojs/taro'
import {Text, View} from '@tarojs/components'
import { AtSearchBar, AtDrawer, AtFab, AtInput } from 'taro-ui'
import './personManagement.scss'
import PersonList from '../../components/personList/index'
import AdvancedSearch from '../../components/advancedSearch'

const fakePersonData = [
  {
    name: '张三',
    enterpriseName: '一个能力十分有限公司',
    role: '员工'
  },
  {
    name: '李四',
    role: '安管员',

  }
]

const PersonManagement = () => {
  const [name, setName] = useState('')


  const initialAdvancedSearchOption = {
    enterpriseName: '',
    role: ''
  }

  const [advancedSearchOption, setAdvancedSearchOption] = useState(initialAdvancedSearchOption)
  const [show, setShow] = useState(false)


  const onNameChange = value => {
    setName(value)
  }

  const onSearchClick = () => {
    console.log('开始搜索')
  }

  const showFilterDrawer = () => {
    setShow(true)
  }
  const closeFilterDrawer = () => {
    setShow(false)
  }

  const advancedSearch = () => {
    console.log('advancedSearch')
  }

  const advancedSearchReset = () => {
    setAdvancedSearchOption(initialAdvancedSearchOption)
  }

  const setInputValue = (key, e) => {
    setAdvancedSearchOption({...advancedSearchOption, [key]: e.target.value})
  }

  return (
    <View className="enterprise-management-wrapper">
      <View className="search-bar-wrapper">
        <Text className="search-bar-item">搜索</Text>
        <View
          className="search-bar"
        >
          <AtSearchBar
            value={name}
            onChange={onNameChange}
            onActionClick={onSearchClick}
          />
        </View>
        <View
          onClick={showFilterDrawer}
          className='at-icon at-icon-filter search-bar-item filter'
        />
      </View>

      <PersonList personData={fakePersonData}/>

      <AtDrawer
        show={show}
        right
        mask
        onClose={closeFilterDrawer}
      >
        <AdvancedSearch
          onSearch={advancedSearch}
          onReset={advancedSearchReset}
        >
          <View>
            <AtInput
              name='企业'
              title='企业'
              type='text'
              placeholder='输入企业'
              value={advancedSearchOption.enterpriseName}
              onChange={e => setInputValue('enterpriseName', e)}
            />
            <AtInput
              name='role'
              title='类型'
              type='text'
              placeholder='输入用户类型'
              value={advancedSearchOption.role}
              onChange={e => setInputValue('role', e)}
            />
          </View>
        </AdvancedSearch>
      </AtDrawer>
      <AtFab className="float-btn">
        <Text className='at-fab__icon at-icon at-icon-add'></Text>
      </AtFab>
    </View>
  )
}

PersonManagement.config = {
  navigationBarTitleText: '企业管理'
}


export default PersonManagement

