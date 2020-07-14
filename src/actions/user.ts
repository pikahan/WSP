import {SET_USER_DATA, SET_USERS_DATA} from '../constants/user'
import {REQUEST_URL} from '../constants/counter'
import Taro from '@tarojs/taro'
import {SET_FILTER_ENTERPRISE_DATA} from '../constants/enterprise'

export const setUserData = userData => ({
  type: SET_USER_DATA,
  userData
})

export const setUsersData = usersData => ({
  type: SET_USERS_DATA,
  usersData
})

export const setFilterUsersData = usersData => ({
  type: SET_FILTER_ENTERPRISE_DATA,
  usersData
})

export function fetchData() {
  return dispatch => {
    Taro.request({
      url: `${REQUEST_URL}user`,
      method: 'GET',
      complete(res) {
        let { data,  statusCode} = res as any
        console.log(data)
        if (statusCode === 200) {
          // let listData = data.data.map(enterprise => {
          //   let { hazardType, enterprise, description: note, ...listData } = hazard
          //   return { typeName: hazardType.name, enterpriseName: enterprise.name, note, ...listData }
          // })

          dispatch(setUsersData(data.data))
        }
      }
    })
  }
}
