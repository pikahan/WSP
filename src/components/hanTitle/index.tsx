import Taro from '@tarojs/taro'
import { Text } from '@tarojs/components'
import './index.scss'

interface HanTitleProp {
  title: string
}

const HanTitle = ({ title }: HanTitleProp) => (
  <Text className="han_title">
    { title }
  </Text>
)

export default HanTitle
