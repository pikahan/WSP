import Taro, { useState } from '@tarojs/taro'
import {Text, View} from '@tarojs/components'
import { AtSearchBar, AtDrawer, AtFab, AtInput } from 'taro-ui'
import './enterpriseManagement.scss'
import Index from '../../components/enterpriseList/index'
import AdvancedSearch from '../../components/advancedSearch'

const fakeEnterpriseData = [
  {
    name: '能力十分有限公司',
    imgSrc: 'http://placehold.it/30x30',
    note: '一个能力十分有限公司'
  },
  {
    name: '能力十分有限公司',
    imgSrc: 'http://placehold.it/30x30',
    note: '一个能力十分有限公司'
  }
]

const EnterpriseManagement = () => {
  const [enterpriseName, setEnterpriseName] = useState('')


  const initialAdvancedSearchOption = {
    code: '',
    legalPerson: ''
  }

  const [advancedSearchOption, setAdvancedSearchOption] = useState(initialAdvancedSearchOption)
  const [show, setShow] = useState(false)


  const onEnterpriseNameChange = value => {
    setEnterpriseName(value)
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
            value={enterpriseName}
            onChange={onEnterpriseNameChange}
            onActionClick={onSearchClick}
          />
        </View>
        <View
          onClick={showFilterDrawer}
          className='at-icon at-icon-filter search-bar-item filter'
        />
      </View>

      <Index enterpriseData={fakeEnterpriseData}/>

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
              name='code'
              title='信用代码'
              type='text'
              placeholder='输入信用代码'
              value={advancedSearchOption.code}
              onChange={e => setInputValue('code', e)}
            />
            <AtInput
              name='legalPerson'
              title='法人'
              type='text'
              placeholder='输入法人'
              value={advancedSearchOption.legalPerson}
              onChange={e => setInputValue('legalPerson', e)}
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

EnterpriseManagement.config = {
  navigationBarTitleText: '企业管理'
}


export default EnterpriseManagement

