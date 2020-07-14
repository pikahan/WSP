import Taro, { useState } from '@tarojs/taro'
// import {Text, View} from '@tarojs/components'
import './personManagement.scss'
import PersonList from '../../components/personList/index'
import AdvancedSearchPage from '../../components/advancedSearchPage'
import AdvancedSearchContent, {PersonFormData} from './advancedSearchContent'

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
  const initialAdvancedSearchOption: PersonFormData = {
    enterpriseName: '',
    role: ''
  }
  const [advancedSearchOption, setAdvancedSearchOption] = useState(initialAdvancedSearchOption)
  const setInputValue = (key, value) => {
    setAdvancedSearchOption({...advancedSearchOption, [key]: value})
  }

  const advancedSearchBtnClick = () => {
    console.log('AdvancedSearchBtnClick')
    console.log(advancedSearchOption)
  }

  const advancedSearchReset = () => {
    console.log('AdvancedSearchBtnClick')
  }

  const searchBtnClick = () => {
    console.log('searchBtnClick')
  }

  const searchContentChange = value => {
    setName(value)
    console.log('searchContentChange')
  }


  return (
    <AdvancedSearchPage
      renderAdvancedSearchContent={<AdvancedSearchContent onValueChange={setInputValue} personFormData={advancedSearchOption} />}
      renderList={<PersonList personData={fakePersonData} />}
      searchContent={name}
      onAdvancedSearchBtnClick={advancedSearchBtnClick}
      onAdvancedSearchReset={advancedSearchReset}
      onSearchBtnClick={searchBtnClick}
      onSearchContentChange={searchContentChange}
    ></AdvancedSearchPage>
  )
}

PersonManagement.config = {
  navigationBarTitleText: '企业管理'
}


export default PersonManagement

