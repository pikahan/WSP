import Taro, { useState } from '@tarojs/taro'
import './userManagement.scss'
import {UserFormData} from './advancedSearchContent'
import AdvancedSearchPage from '../../components/advancedSearchPage'
import AdvancedSearchContent from './advancedSearchContent'
import UserList from '../../components/userList'
import useEffect = Taro.useEffect
import {useDispatch, useSelector} from '@tarojs/redux'
import {RootState} from '../../reducers'
import {myFilter} from '../../util/helper'
import {fetchData, setFilterUsersData} from '../../actions/user'


const UserManagement = () => {
  const [name, setName] = useState('')
  // const [enterpriseData, setEnterpriseData] = useState([])
  const userData = useSelector((state: RootState) => state.user.userData)
  const userDataFromStore = useSelector((state: RootState) => state.user.usersData)
  const filterUserDataFromStore = useSelector((state: RootState) => state.user.filterUsersData)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchData())
  }, [])
  const initialAdvancedSearchOption: UserFormData = {
    typeId: 0,
    username: ''
  }
  const [advancedSearchOption, setAdvancedSearchOption] = useState(initialAdvancedSearchOption)
  const setInputValue = (key, value) => {
    setAdvancedSearchOption({...advancedSearchOption, [key]: value})
  }

  const advancedSearchBtnClick = () => {
    console.log('AdvancedSearchBtnClick')
    dispatch(setFilterUsersData(myFilter(userDataFromStore, advancedSearchOption, name)))
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
      url: '/pages/userDetail/userDetail'
    })
  }

  return (
    <AdvancedSearchPage
      renderAdvancedSearchContent={<AdvancedSearchContent onValueChange={setInputValue} userFormData={advancedSearchOption} />}
      renderList={<UserList userData={filterUserDataFromStore} />}
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

UserManagement.config = {
  navigationBarTitleText: '企业'
}

export default UserManagement

