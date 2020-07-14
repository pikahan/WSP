import Taro, { useState } from '@tarojs/taro'
import { Picker, View } from '@tarojs/components'

import { AtList, AtListItem } from 'taro-ui'
import {AdvancedSearchContentProp} from '../../components/advancedSearchPage'
import {useSelector} from '@tarojs/redux'
import {RootState} from '../../reducers'
import {SafetyHazardLevel} from '../../reducers/hazard'


export interface SafetyHazardFormData {
  level: SafetyHazardLevel
  hazardTypeId: number
}

const levels = ['空', '重大', '较大', '一般']


interface SafetyHazardAdvancedSearchContentProp extends AdvancedSearchContentProp{
  safetyHazardFormData: SafetyHazardFormData
}

const AdvancedSearchContent = (props: SafetyHazardAdvancedSearchContentProp) => {

  const [typeIndex, setTypeIndex] = useState(0)
  const [levelIndex, setLevelIndex] = useState(0)


  const type = [{ id: -1, name: '空' }, ...useSelector((state: RootState) => state.hazard.hazardCategory)]

  const handleTypeChange = e => {
    console.log(e)
    const index = e.detail.value
    props.onValueChange('hazardTypeId', type[index].id);
    setTypeIndex(index*1)
  }

  const handleLevelChange = e => {
    const index = e.detail.value
    props.onValueChange('level', levels[index]);
    setLevelIndex(index*1)

  }

  return (
    <View>
      <Picker mode='selector' range={levels} onChange={handleLevelChange} value={levelIndex}>
        <AtList>
          <AtListItem
            title='隐患等级'
            extraText={levels[levelIndex]}
          />
        </AtList>
      </Picker>
      <Picker mode='selector' range={type} rangeKey="name" onChange={handleTypeChange} value={typeIndex}>
        <AtList>
          <AtListItem
            title='隐患类别'
            extraText={type[typeIndex].name}
          />
        </AtList>
      </Picker>
    </View>
  )
}

export default AdvancedSearchContent
