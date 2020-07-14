import Taro from '@tarojs/taro'
import './index.scss'
import { View } from '@tarojs/components'
import  { AtForm, AtButton } from 'taro-ui'
import HanTitle from '../hanTitle'

interface AdvancedSearchProp {
  onSearch: () => void
  onReset: () => void
  children: JSX.Element
}

const AdvancedSearch = (props: AdvancedSearchProp) => {

  return (
    <View>
      <HanTitle title="高级搜索"/>
      <AtForm
        onSubmit={props.onSearch}
        onReset={props.onReset}
      >
        { props.children }
          <View className="btn-group-item">
            <AtButton size='small' type='primary' formType='submit'>提交</AtButton>

          </View>
          <View className="btn-group-item">
            <AtButton size='small' formType='reset'>重置</AtButton>
          </View>

      </AtForm>
    </View>
  )
}


export default AdvancedSearch

