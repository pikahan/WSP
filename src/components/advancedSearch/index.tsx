import Taro from '@tarojs/taro'
import './index.scss'
import {Text, View} from '@tarojs/components'
import  { AtForm, AtButton } from 'taro-ui'

interface AdvancedSearchProp {
  onSearch: () => void
  onReset: () => void
  children: JSX.Element
}

const AdvancedSearch = (props: AdvancedSearchProp) => {

  return (
    <View>
      <Text className="advanced-search-title">
        高级搜索
      </Text>
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

