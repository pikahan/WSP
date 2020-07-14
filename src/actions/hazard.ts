import {SET_CATEGORY, SET_FILTER_HAZARD_DATA, SET_HAZARD_DATA} from '../constants/safetyHazard'
import {REQUEST_URL} from '../constants/counter'
import Taro from '@tarojs/taro'

export const setCategory = categoryData => ({
  type: SET_CATEGORY,
  categoryData
})

export const setHazardData = hazardData => ({
  type: SET_HAZARD_DATA,
  hazardData
})

export const setFilterHazardData = hazardData => ({
  type: SET_FILTER_HAZARD_DATA,
  hazardData
})

export function fetchCategory() {
  return dispatch => {
    // TODO fetch Date
    setTimeout(() => {
      dispatch(setCategory([
        {
          id: 0,
          name: '机械安全',
        },
        {
          id: 1,
          name: '烟花爆竹',
        },
        {
          id: 2,
          name: '冶金类',
        },
        {
          id: 3,
          name: '危险化学品管理',
        },
      ]))
    }, 500)
  }
}

export function fetchData() {
  return dispatch => {
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

          dispatch(setHazardData(listData))
        }
      }
    })
  }
}

