import Taro, { useState } from '@tarojs/taro'
import {Text, View} from '@tarojs/components'
import { AtSearchBar, AtDrawer, AtFab } from 'taro-ui'
import './index.scss'
import AdvancedSearch from '../../components/advancedSearch'

interface AdvancedSearchPageProp {
  renderList: JSX.Element
  renderAdvancedSearchContent: JSX.Element
  onSearchContentChange: (e) => void
  onSearchBtnClick: () => void
  searchContent: string
  onAdvancedSearchBtnClick: () => void
  onAdvancedSearchReset: () => void
  hasFloatBtn?: boolean
  onFloatBtnClick?: () => void
}

export interface AdvancedSearchContentProp {
  onInputValueChange?: (key, value) => void
  onPickerValueChange?: (key, value) => void
  onValueChange: (key, value) => void
}

const AdvancedSearchPage = (props: AdvancedSearchPageProp) => {
  const hasFloatBtn = props.hasFloatBtn || false


  const [show, setShow] = useState(false)
  const showFilterDrawer = () => {
    setShow(true)
  }
  const closeFilterDrawer = () => {
    setShow(false)
  }

  return (
    <View className="page-wrapper">
      <View className="search-bar-wrapper">
        <Text className="search-bar-item">搜索</Text>
        <View
          className="search-bar"
        >
          <AtSearchBar
            value={props.searchContent}
            onChange={props.onSearchContentChange}
            onActionClick={props.onSearchBtnClick}
          />
        </View>
        <View
          onClick={showFilterDrawer}
          className='at-icon at-icon-filter search-bar-item filter'
        />
      </View>

      {
        props.renderList
      }

      <AtDrawer
        show={show}
        right
        mask
        onClose={closeFilterDrawer}
      >
        <AdvancedSearch
          onSearch={props.onAdvancedSearchBtnClick}
          onReset={props.onAdvancedSearchReset}
        >
          {
            props.renderAdvancedSearchContent
          }
        </AdvancedSearch>
      </AtDrawer>
      {
        hasFloatBtn &&
        (
          <View className="float-btn">
            <AtFab onClick={props.onFloatBtnClick} size="small">
              <Text className='at-fab__icon at-icon at-icon-add'></Text>
            </AtFab>
          </View>
        )
      }

    </View>
  )
}

AdvancedSearchPage.options = {
  addGlobalClass: true
}

export default AdvancedSearchPage

