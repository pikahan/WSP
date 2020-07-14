import {SET_FILTER_USERS_DATA, SET_USER_DATA, SET_USERS_DATA} from '../constants/user'



interface UserData {
  id: number
  userType: string
  token: string
  enterpriseId: number
  username: string
  typeId: number
}

const INITIAL_STATE = {
  userData: {} as UserData,
  usersData: [] as Array<UserData>,
  filterUsersData: [] as Array<UserData>
}



export type UserState = typeof INITIAL_STATE

export default function counter (state = INITIAL_STATE, action) {
  switch (action.type) {
    case SET_USERS_DATA:
      return {
        ...state,
        usersData: action.usersData,
        filterUsersData: action.usersData
      }
    case SET_FILTER_USERS_DATA:
      return {
        ...state,
        filterUsersData: action.usersData
      }
    case SET_USER_DATA:
      return {
        ...state,
        userData: action.userData
      }
    default:
      return state
  }
}
