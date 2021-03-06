import Taro, { useState } from '@tarojs/taro'
import './enterpriseManagement.scss'
import AdvancedSearchContent from './advancedSearchContent'
import {EnterpriseFormData} from './advancedSearchContent'
import AdvancedSearchPage from '../../components/advancedSearchPage'
import EnterpriseList from '../../components/enterpriseList'
import useEffect = Taro.useEffect
import {useDispatch, useSelector} from '@tarojs/redux'
import {RootState} from '../../reducers'
import {setFilterEnterpriseData, fetchData} from '../../actions/enterprise'
import {myFilter} from '../../util/helper'


const EnterpriseManagement = () => {
  const [name, setName] = useState('')
  // const [enterpriseData, setEnterpriseData] = useState([])
  const userData = useSelector((state: RootState) => state.user.userData)
  const enterpriseDataFromStore = useSelector((state: RootState) => state.enterprise.enterpriseData)
  const filterEnterpriseDataFromStore = useSelector((state: RootState) => state.enterprise.filterEnterpriseData)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchData())
  }, [])
  const initialAdvancedSearchOption: EnterpriseFormData = {
    code: '',
    legalPerson: ''
  }
  const [advancedSearchOption, setAdvancedSearchOption] = useState(initialAdvancedSearchOption)
  const setInputValue = (key, value) => {
    setAdvancedSearchOption({...advancedSearchOption, [key]: value})
  }

  const advancedSearchBtnClick = () => {
    console.log('AdvancedSearchBtnClick')
    dispatch(setFilterEnterpriseData(myFilter(enterpriseDataFromStore, advancedSearchOption, name)))
  }

  const advancedSearchReset = () => {
    console.log('AdvancedSearchBtnClick')
  }

  const searchBtnClick = () => {
    advancedSearchBtnClick()
  }

  const searchContentChange = value => {
    setName(value)
    console.log('searchContentChange')
  }

  const handleFloatBtnClick = () => {
    Taro.navigateTo({
      url: '/pages/enterpriseDetail/enterpriseDetail'
    })
  }

  return (
    <AdvancedSearchPage
      renderAdvancedSearchContent={<AdvancedSearchContent onValueChange={setInputValue} enterpriseFormData={advancedSearchOption} />}
      renderList={<EnterpriseList enterpriseData={filterEnterpriseDataFromStore} />}
      searchContent={name}
      onAdvancedSearchBtnClick={advancedSearchBtnClick}
      onAdvancedSearchReset={advancedSearchReset}
      onSearchBtnClick={searchBtnClick}
      onSearchContentChange={searchContentChange}
      hasFloatBtn={userData.userType === '管理员'}
      onFloatBtnClick={handleFloatBtnClick}
    ></AdvancedSearchPage>
  )
}

EnterpriseManagement.config = {
  navigationBarTitleText: '企业'
}

export default EnterpriseManagement

