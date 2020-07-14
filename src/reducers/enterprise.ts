import {SET_ENTERPRISE_DATA,SET_FILTER_ENTERPRISE_DATA} from '../constants/enterprise'



interface EnterpriseData {
  id: number
  name: string
  staff: string
  staffPhone: string
}

const INITIAL_STATE = {

  enterpriseData: <Array<EnterpriseData>>[],
  filterEnterpriseData: <Array<EnterpriseData>>[],

}



export type EnterpriseState = typeof INITIAL_STATE

export default function counter (state = INITIAL_STATE, action) {
  switch (action.type) {

    case SET_ENTERPRISE_DATA:
      return {
        ...state,
        enterpriseData: action.enterpriseData,
        filterEnterpriseData: action.enterpriseData
      }
    case SET_FILTER_ENTERPRISE_DATA:
      return {
        ...state,
        filterEnterpriseData: action.enterpriseData
      }
    default:
      return state
  }
}
