import Taro, { useState } from '@tarojs/taro'
import './safetyHazard.scss'
import AdvancedSearchContent from './advancedSearchContent'
import AdvancedSearchPage from '../../components/advancedSearchPage'
import {useDispatch, useSelector} from '@tarojs/redux'
import useEffect = Taro.useEffect
import {fetchCategory, fetchData, setFilterHazardData, setHazardData} from '../../actions/hazard'
import HazardList from '../../components/hazardList'
import {SafetyHazardLevel} from '../../reducers/hazard'
import {RootState} from '../../reducers'
import {myFilter} from '../../util/helper'
import usePullDownRefresh = Taro.usePullDownRefresh
import {REQUEST_URL} from '../../constants/counter'


const SafetyHazard = () => {
  const dispatch = useDispatch();

  // 刷新
  usePullDownRefresh(() => {
    Taro.showNavigationBarLoading()
    Taro.showLoading({
      title: '刷新中'
    })
    Taro.request({
      url: `${REQUEST_URL}hazard`,
      method: 'GET',
      complete(res) {
        let { data,  statusCode} = res as any
        console.log(data)
        if (statusCode === 200) {
          let listData = data.data.map(hazard => {
            let { hazardType, enterprise, description: note, ...listData } = hazard
            return { typeName: hazardType.name, enterpriseName: enterprise.name, note, ...listData }
          })
          Taro.hideLoading()
          Taro.hideNavigationBarLoading()
          dispatch(setHazardData(listData))
        }
      }
    })
  })


  const [name, setName] = useState('')
  const initialAdvancedSearchOption = {
    level: '空' as SafetyHazardLevel,
    hazardTypeId: -1
  }
  const hazardDataFromStore = useSelector((state: RootState) => state.hazard.hazardData)
  const filterHazardDataFromStore = useSelector((state: RootState) => state.hazard.filterHazardData)

  useEffect(() => {
    dispatch(fetchData())
    dispatch(fetchCategory())

  }, [])


  const [advancedSearchOption, setAdvancedSearchOption] = useState(initialAdvancedSearchOption)
  const setInputValue = (key, value) => {
    setAdvancedSearchOption({...advancedSearchOption, [key]: value})
  }

  const advancedSearchBtnClick = () => {
    console.log(advancedSearchOption)
    dispatch(setFilterHazardData(myFilter(hazardDataFromStore, advancedSearchOption, name)))
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
      url: '/pages/safetyHazardDetail/safetyHazardDetail'
    })
  }

  return (
    <AdvancedSearchPage
      renderAdvancedSearchContent={<AdvancedSearchContent onValueChange={setInputValue} safetyHazardFormData={initialAdvancedSearchOption} />}
      renderList={<HazardList hazardData={filterHazardDataFromStore} />}
      searchContent={name}
      onAdvancedSearchBtnClick={advancedSearchBtnClick}
      onAdvancedSearchReset={advancedSearchReset}
      onSearchBtnClick={searchBtnClick}
      onSearchContentChange={searchContentChange}
      hasFloatBtn={true}
      onFloatBtnClick={handleFloatBtnClick}
    ></AdvancedSearchPage>
  )
}

SafetyHazard.config = {
  navigationBarTitleText: '隐患',
  enablePullDownRefresh: true
}

export default SafetyHazard

