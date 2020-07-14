import Taro from '@tarojs/taro'
import './index.scss'
import {AtList, AtListItem} from 'taro-ui'

interface HazardListProp {
  hazardData: Array<HazardData>
}

interface HazardData {
  id: number
  name: string
  note: string
  typeName: string
}


const imageMap = typeName => {
  let ret
  switch (typeName) {
    case '机械安全':
      ret = require('../../image/zzjx.png')
      break
    case '烟花爆竹':
      ret = require('../../image/yh.png')
      break
    case '冶金类':
      ret = require('../../image/yj.png')
      break
    case '危险化学品':
      ret = require('../../image/hxsj.png')
  }
  return ret
}

// TODO 之后根据type来判断图表
const HazardList = ({ hazardData }: HazardListProp) => {

  const handleListItemClick = (hazard: HazardData) => {
    console.log(hazard)
    Taro.navigateTo({
      url: `/pages/safetyHazardDetail/safetyHazardDetail?id=${hazard.id}`
    })
  }

  return (
    <AtList className="enterprise-list">
      {
        hazardData.map(hazard => (
          <AtListItem
            onClick={() => handleListItemClick(hazard)}
            title={hazard.name}
            arrow='right'
            note={hazard.note}
            thumb={imageMap(hazard.typeName)}
          >
          </AtListItem>
        ))
      }
    </AtList>
  )
}


export default HazardList

