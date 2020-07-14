import {SET_CATEGORY, SET_FILTER_HAZARD_DATA, SET_HAZARD_DATA} from '../constants/safetyHazard'

export type SafetyHazardLevel = '重点' | '较大' | '一般' | '空'


interface HazardData {
  id: number
  name: string
  safetyHazardLevel: SafetyHazardLevel
  typeId: number
  description: string
  measures: string
  limitTime: number
  shootingTime: number
  shootingPerson: string
  location: Array<string>
  troubleshooter: string
  imageSrcList: Array<string>
}

const INITIAL_STATE = {
  hazardCategory: [{
    id: -1,
    name: '空'
  }],
  hazardData: <Array<HazardData>>[],
  filterHazardData: <Array<HazardData>>[],

}



export type HazardState = typeof INITIAL_STATE

export default function counter (state = INITIAL_STATE, action) {
  switch (action.type) {
    case SET_CATEGORY:
      return {
        ...state,
        hazardCategory: action.categoryData
      }
    case SET_HAZARD_DATA:
      return {
        ...state,
        hazardData: action.hazardData,
        filterHazardData: action.hazardData
      }
    case SET_FILTER_HAZARD_DATA:
      return {
        ...state,
        filterHazardData: action.hazardData
      }
    default:
      return state
  }
}
