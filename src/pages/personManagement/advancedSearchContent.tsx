import Taro from '@tarojs/taro'
import {View} from '@tarojs/components'
import {AtInput} from 'taro-ui'
import {AdvancedSearchContentProp} from '../../components/advancedSearchPage'

export interface PersonFormData {
  role: string
  enterpriseName: string
}

interface PersonAdvancedSearchContentProp extends AdvancedSearchContentProp{
  personFormData: PersonFormData
}

const AdvancedSearchContent = (props: PersonAdvancedSearchContentProp) => {

  return (
    <View>
      <AtInput
        name='企业'
        title='企业'
        type='text'
        placeholder='输入企业'
        value={props.personFormData.enterpriseName}
        onChange={e => props.onValueChange('enterpriseName', e)}
      />
      <AtInput
        name='role'
        title='类型'
        type='text'
        placeholder='输入用户类型'
        value={props.personFormData.role}
        onChange={e => props.onValueChange('role', e)}
      />
    </View>
  )
}

export default AdvancedSearchContent
