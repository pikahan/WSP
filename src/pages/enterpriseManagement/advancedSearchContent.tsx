import Taro from '@tarojs/taro'
import {View} from '@tarojs/components'
import {AtInput} from 'taro-ui'
import {AdvancedSearchContentProp} from '../../components/advancedSearchPage'

export interface EnterpriseFormData {
  code: string
  legalPerson: string
}

interface EnterpriseAdvancedSearchContentProp extends AdvancedSearchContentProp{
  enterpriseFormData: EnterpriseFormData
}

const AdvancedSearchContent = (props: EnterpriseAdvancedSearchContentProp) => {

  return (
    <View>
      <AtInput
        name='code'
        title='信用代码'
        type='text'
        placeholder='输入信用代码'
        value={props.enterpriseFormData.code}
        onChange={e => props.onValueChange('enterpriseName', e)}
      />
      <AtInput
        name='legalPerson'
        title='法人'
        type='text'
        placeholder='输入法人'
        value={props.enterpriseFormData.legalPerson}
        onChange={e => props.onValueChange('role', e)}
      />
    </View>
  )
}

export default AdvancedSearchContent
