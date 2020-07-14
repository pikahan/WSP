import Taro from '@tarojs/taro'
import {View} from '@tarojs/components'
import {AtInput} from 'taro-ui'
import {AdvancedSearchContentProp} from '../../components/advancedSearchPage'

export interface UserFormData {
  typeId: number
  username: string
}

interface UserAdvancedSearchContentProp extends AdvancedSearchContentProp{
  userFormData: UserFormData
}

const AdvancedSearchContent = (props: UserAdvancedSearchContentProp) => {

  return (
    <View>
      <AtInput
        name='code'
        title='信用代码'
        type='text'
        placeholder='输入信用代码'
        value={props.userFormData.username}
        onChange={e => props.onValueChange('enterpriseName', e)}
      />
      <AtInput
        name='legalPerson'
        title='法人'
        type='text'
        placeholder='输入法人'
        value={props.userFormData.username}
        onChange={e => props.onValueChange('role', e)}
      />
    </View>
  )
}

export default AdvancedSearchContent
