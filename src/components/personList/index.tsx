import Taro from '@tarojs/taro'
import './index.scss'
import {AtList, AtListItem} from 'taro-ui'

interface PersonListProp {
  personData: Array<personData>
}

interface personData {
  name: string
  role: string
  enterpriseName?: string
}

const PersonList = ({ personData }: PersonListProp) => {

  return (
    <AtList className="enterprise-list">
      {
        personData.map(data => (
          <AtListItem
            title={data.name}
            arrow='right'
            note={data.role === '员工' ? `${data.enterpriseName}员工` : data.role}
          >

          </AtListItem>
        ))
      }
    </AtList>
  )
}


export default PersonList

