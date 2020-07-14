import Taro from '@tarojs/taro'
import './index.scss'
import {AtList, AtListItem} from 'taro-ui'

interface IPropEnterpriseList {
  enterpriseData: Array<EnterpriseData>
}

interface EnterpriseData {
  name: string
  staff: string
  staffPhone: string
  id: number
}

const EnterpriseList = ({ enterpriseData }: IPropEnterpriseList) => {

  const handleClick = item => {
    // Taro.chooseLocation({
    //   complete(res) {
    //     console.log(res)
    //   }
    // })
    Taro.navigateTo({
      url: `/pages/enterpriseDetail/enterpriseDetail?id=${item.id}`
    })
  }

  return (
    <AtList className="enterprise-list">
      {
        enterpriseData.map(enterprise => (
          <AtListItem
            onClick={() => handleClick(enterprise)}
            title={enterprise.name}
            arrow='right'
            note={`责任人:${enterprise.staff} 联系电话:${enterprise.staffPhone}`}
            thumb="http://placehold.it/30x30"
          >
          </AtListItem>
        ))
      }
    </AtList>
  )
}


export default EnterpriseList

