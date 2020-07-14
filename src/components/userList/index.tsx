import Taro from '@tarojs/taro'
import './index.scss'
import {AtList, AtListItem} from 'taro-ui'

interface IPropUserList {
  userData: Array<UserData>
}

interface UserData {
  username: string
  userTypeId: number
  id: number
}
const type = ['员工', '管理员', '安管员', '安管负责人', '应急局人员']

const UserList = ({ userData }: IPropUserList) => {

  const handleClick = item => {

    Taro.navigateTo({
      url: `/pages/userDetail/userDetail?id=${item.id}`
    })
  }

  return (
    <AtList className="enterprise-list">
      {
        userData.map(user => (
          <AtListItem
            onClick={() => handleClick(user)}
            title={user.username}
            arrow='right'
            note={`${type[user.userTypeId]}`}
          >
          </AtListItem>
        ))
      }
    </AtList>
  )
}


export default UserList

