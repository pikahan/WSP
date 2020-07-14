import { SET_ENTERPRISE_DATA, SET_FILTER_ENTERPRISE_DATA} from '../constants/enterprise'
import {REQUEST_URL} from '../constants/counter'
import Taro from '@tarojs/taro'

export const setEnterpriseData = enterpriseData => ({
  type: SET_ENTERPRISE_DATA,
  enterpriseData
})

export const setFilterEnterpriseData = enterpriseData => ({
  type: SET_FILTER_ENTERPRISE_DATA,
  enterpriseData
})

export function fetchData() {
  return dispatch => {
    Taro.request({
      url: `${REQUEST_URL}enterprise`,
      method: 'GET',
      complete(res) {
        let { data,  statusCode} = res as any
        console.log(data)
        if (statusCode === 200) {
          // let listData = data.data.map(enterprise => {
          //   let { hazardType, enterprise, description: note, ...listData } = hazard
          //   return { typeName: hazardType.name, enterpriseName: enterprise.name, note, ...listData }
          // })

          dispatch(setEnterpriseData(data.data))
        }
      }
    })
  }
}

