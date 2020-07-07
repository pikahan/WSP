import Taro from '@tarojs/taro'
import './index.scss'
import {AtList, AtListItem} from 'taro-ui'

interface IPropEnterpriseList {
  enterpriseData: Array<EnterpriseData>
}

interface EnterpriseData {
  name: string
  imgSrc: string
  note: string
}

const EnterpriseList = ({ enterpriseData }: IPropEnterpriseList) => {

  return (
    <AtList className="enterprise-list">
      {
        enterpriseData.map(enterprise => (
          <AtListItem
            title={enterprise.name}
            arrow='right'
            note={enterprise.note}
            thumb={enterprise.imgSrc}
          >

          </AtListItem>
        ))
      }
    </AtList>
  )
}


export default EnterpriseList

