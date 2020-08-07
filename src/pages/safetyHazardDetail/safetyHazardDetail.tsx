import Taro, { useState, useRouter, useEffect } from '@tarojs/taro'
import './safetyHazardDetail.scss'
import {View, Picker, Text, Button, Canvas} from '@tarojs/components'
import {AtForm, AtMessage, AtImagePicker, AtInput, AtList, AtListItem, AtInputNumber, AtTextarea, AtButton, AtSegmentedControl} from 'taro-ui'
import {useDispatch, useSelector} from '@tarojs/redux'
import {RootState} from '../../reducers'
import HanTitle from '../../components/hanTitle'
import {REQUEST_URL} from '../../constants/counter'
import {fetchData} from '../../actions/hazard'

export interface Permissions {
  hazardDetailPageOneEditPermission: boolean
  hazardDetailPageTwoEditPermission: boolean
  hazardDetailPageThreeEditPermission: boolean
}

const initialPermission = {
  hazardDetailPageOneEditPermission: true,
  hazardDetailPageTwoEditPermission: false,
  hazardDetailPageThreeEditPermission: false
}

const getFileList = src => {
  let res = src.split('\t').map(src => ({ url: REQUEST_URL + 'static' + src}))
  console.log(res)
  return res
}

const getPermissions = (userType, pageType, hazardStep) => {
  let ret: Permissions = initialPermission

  if (userType !== '员工') {
    ret.hazardDetailPageTwoEditPermission = true
    ret.hazardDetailPageTwoEditPermission = true
    ret.hazardDetailPageThreeEditPermission = true

  }

  if (hazardStep === 1) {
    ret.hazardDetailPageOneEditPermission = false
    ret.hazardDetailPageThreeEditPermission = false

  }

  if (hazardStep === 2) {
    ret.hazardDetailPageOneEditPermission = false
    ret.hazardDetailPageTwoEditPermission = false
  }

  if (hazardStep === 3) {
    ret.hazardDetailPageOneEditPermission = false
    ret.hazardDetailPageTwoEditPermission = false
    ret.hazardDetailPageThreeEditPermission = false
  }

  if (pageType === 'add') {
    ret.hazardDetailPageOneEditPermission = true
    ret.hazardDetailPageTwoEditPermission = false
    ret.hazardDetailPageThreeEditPermission = false
  }

  return ret
}

const levels = ['重大', '较大', '一般']
const forSafetyHazardLevel = index => {
  return levels[index]
}

function debounce(delay, fn) {
  let timer
  return function(...args) {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      timer = null
      fn.apply(this, args)
    }, delay)
  }
}


const SafetyHazardDetail = () => {
  const [permissions, setPermissions] = useState<Permissions>(initialPermission)
  const dispatch = useDispatch()
  const [file, setFile] = useState<any>([]) // 文档
  const [solvedImageFiles, setSolvedImageFiles] = useState<any>([])


  const [files, setFiles] = useState<any>([]) // 照片
  const [showAddBtn, setShowAddBtn] = useState(true)

  // 添加水印用到的canvas
  const [canvasHeight, setCanvasHeight] = useState(0)
  const [canvasWidth, setCanvasWidth] = useState(0)


  const handleImageChange = value => {
    // 添加水印的操作
    value.forEach(file => {
      Taro.getImageInfo({
        src: file.url,
        success(res) {
          let ctx = Taro.createCanvasContext('myCanvas')
          let width = res.width
          let height = res.height

          setCanvasHeight(height)
          setCanvasWidth(width)
          ctx.drawImage(res.path, 0, 0, width, height)
          ctx.beginPath()
          ctx.setFontSize(12)
          ctx.setFillStyle('white')
          ctx.fillText(`${userData.username}  ${(new Date).toLocaleString()}`, 0, 20)
          ctx.draw(false, () => {
            console.log('draw')
            Taro.canvasToTempFilePath({
              x: 0,
              y: 0,
              width,
              height,
              destWidth: width,
              destHeight: height,
              canvasId: 'myCanvas',
              success(res) {
                console.log(res.tempFilePath)
                setFiles([...files, {url: res.tempFilePath}])
              }
            })
          })
        },
        complete(res) {
          console.log(res)
        }
      })
    })

    if (value.length > 3) { // 如果图片数量大于三会发送警告
      return Taro.atMessage({
        message: '最多上传三张图片',
        type: 'error'
      })
    } else if (value.length === 3) { // 等于三会隐藏添加按钮
      setShowAddBtn(false)
    } else {
      setShowAddBtn(true)
    }
  }

  const solvedLevels = ['完成整改', '未完成整改']
  const [solvedFormData, setSolvedFormData] = useState<any>({
    status: '完成整改'
  })
  const [acceptanceData, setAcceptanceData] = useState({
    acceptanceStatus: '合格',
    acceptanceOpinion: '',
    acceptancer: ''
  })
  const [formData, setFormData] = useState<any>({
    name: '',
    level: '',
    hazardTypeId: 0,
    description: '',
    measures: '',
    limitedTime: 0,
    shootingPerson: '',
    troubleshooter: '',
    status: '',
    fileSrc: '',
    shootingImgSrc: '',
    resolvedImgSrcList: '',
    acceptanceStatus: '',
    acceptanceOpinion: '',
    acceptanceDate: '',
    rectificationDate: '',
  })


  const [levelIndex, setSafetyHazardLevelIndex] = useState(0)
  const handleSafetyHazardLevelChange = e => {
    setSafetyHazardLevelIndex(e.detail.value*1)
    setFormValue('level', forSafetyHazardLevel(levelIndex))
  }

  const type = useSelector((state: RootState) => state.hazard.hazardCategory)
  const userData = useSelector((state: RootState) => state.user.userData)

  const [typeIndex, setTypeIndex] = useState(0)
  const handleTypeChange = e => {
    console.log(e)
    setTypeIndex(e.detail.value*1)
    setFormValue('hazardTypeId', type[e.detail.value*1].id)
  }

  const router = useRouter()
  useEffect(() => {
    // 路径参数
    console.log(router.params)
    const pageType = typeof router.params.id === 'undefined' ? 'add' : 'noAdd'
    if (pageType === 'add') {
      setPermissions(getPermissions(userData.userType, pageType, 0))
      return
    }



    Taro.request({
      url: `${REQUEST_URL}hazard/${router.params.id}`,
      method: 'GET',
      complete(res) {
        let { data,  statusCode} = res as any
        if (statusCode === 200) {
          console.log(res)
          let { shootingImgSrc, name, level, limitedTime, description, measures, hazardTypeId, status, fileSrc, resolvedImgSrcList, troubleshooter, rectificationDate, ...rest } = data.data as any
          let shootingImgList = getFileList(shootingImgSrc)
          console.log(shootingImgList)
          setFiles(shootingImgList)
          setFormData({
            name,
            level,
            limitedTime,
            description,
            measures,
            hazardTypeId
          })

          if (troubleshooter === null) {
            setPermissions(getPermissions(userData.userType, pageType, 1))
            return
          }

          setSolvedFormData({
            status,
            troubleshooter,
            rectificationDate
          })
          setFile(getFileList(fileSrc))
          setSolvedImageFiles(getFileList(resolvedImgSrcList))

          if (rest.acceptanceDate === null) {
            setPermissions(getPermissions(userData.userType, pageType, 2))
            return
          }
          setAcceptanceData(rest)
          setPermissions(getPermissions(userData.userType, pageType, 3))
        }
      }
    })

  }, [])

  // 分段器
  const [current, setCurrent] = useState(0)
  const handleSegmentedControlClick = (value) => {
    if (value === 1 && permissions.hazardDetailPageOneEditPermission) {
      Taro.atMessage({
        message: '请先完成上报',
        type: 'error'
      })
      return
    }

    if (value === 2 && permissions.hazardDetailPageTwoEditPermission) {
      Taro.atMessage({
        message: '请先完成整改',
        type: 'error'
      })
      return
    }
    setCurrent(value)
  }

  const uploadFile = (images, url, key) => {
    return Promise.all(images.map(imageFiles => {
      return Taro.uploadFile({
        url,
        filePath: imageFiles.url ? imageFiles.url : imageFiles.path,
        name: key,
        complete(res) {
          console.log(res)
        }
      })

    }))
  }

  const uploadFileMu = async (images, url, key) => {
    for (let i = 0; i< images.length; i++) {
      let imageFiles = images[i]
      await Taro.uploadFile({
        url,
        filePath: imageFiles.url ? imageFiles.url : imageFiles.path,
        name: key,
        complete(res) {
          console.log(res)
        }
      })
    }

    return Promise.resolve()
  }

  const handleSubmit = () => {
    console.log(formData)

    const requestData = {
      hazardTypeId: formData.hazardTypeId,
      description: formData.description,
      measures: formData.measures,
      limitedTime: formData.limitedTime,
      name: formData.name,
      level: formData.level,
      shootingTime: (new Date).getTime(),
      shootingPerson: userData.userType,
      enterpriseId: userData.enterpriseId
    }

    console.log(requestData)

    // TODO 数据校验
    Taro.request({
      url: `${REQUEST_URL}add/hazard`,
      method: 'POST',
      data: JSON.stringify(requestData),
      complete(res) {
        let { data } = res as any
        console.log(res)
        if (data.status === 200) {
          // 上传图片
          uploadFileMu(files,  `${REQUEST_URL}upload/shootingimg?hazardId=${data.data}`, "file").then(() => {
            dispatch(fetchData())
            Taro.navigateBack({
              delta: 1
            })
          })
        }
      }
    })
  }

  // 整改页面
  const handleResolveSubmit = () => {
    const requestData = {
      id: router.params.id,
      rectificationDate: (new Date).getTime(),
      troubleshooter: userData.username,
      ...solvedFormData
    }
    Taro.request({
      url: `${REQUEST_URL}update/hazard`,
      method: 'POST',
      data: JSON.stringify(requestData),
      complete(res) {
        let { data } = res as any
        console.log(res)
        if (data.status === 200) {
          // 上传文档
          // 上传图片
          Promise.all([
            uploadFile(file, `${REQUEST_URL}upload/document?hazardId=${data.data}`, "file").then(() => {
            console.log('成功文档')
          }),
            uploadFile(solvedImageFiles, `${REQUEST_URL}upload/resolveimg?hazardId=${data.data}`, "file").then(() => {
            console.log('成功图片')
          })]).then(() => {
            console.log('成功上传')
            dispatch(fetchData())
            Taro.navigateBack({
              delta: 1
            })
          })
        }
      }
    })
  }
  const handleAcceptanceSubmit = () => {
    const requestData = {
      id: router.params.id,
      acceptanceDate: (new Date).getTime(),

      ...acceptanceData
    }
    Taro.request({
      url: `${REQUEST_URL}update/hazard`,
      method: 'POST',
      data: JSON.stringify(requestData),
      complete(res) {
        let { data } = res as any
        console.log(data)
        dispatch(fetchData())
        Taro.navigateBack({
          delta: 1
        })
      }
    })
  }

  const [statusIndex, setStatusIndex] = useState(0)


  const [showSolvedAddBtn, setShowSolvedAddBtn] = useState(true)

  const handleSolvedImageChange = files => {
    console.log(files)
    if (files.length > 3) {
      return Taro.atMessage({
        message: '最多上传三张图片',
        type: 'error'
      })
    } else if (files.length === 3) {
      setShowSolvedAddBtn(false)
    } else {
      setShowSolvedAddBtn(true)
    }
    setSolvedImageFiles(files)
  }

  const handleStatusChange = e => {
    setStatusIndex(e.detail.value*1)
    setFormValue('status', solvedLevels[statusIndex], 1)
  }

  const handleFileUpload = () => {
    Taro.chooseMessageFile({
      count: 1,
      type: 'file',
      success(res) {
        console.log(res.tempFiles)
        setFile(res.tempFiles)
      }
    })
  }

  // 验收
  const acceptanceLevels = ['合格', '不合格']
  const [acceptanceStatusIndex, setAcceptanceStatusIndex] = useState(0)
  const handleAcceptanceChange = e => {
    setAcceptanceStatusIndex(e.detail.value*1)
    setFormValue('acceptanceStatus', acceptanceLevels[e.detail.value*1], 2)
  }


  const handleFileDownload = () => {
    Taro.downloadFile({
      url: file[0].url,
      success(res) {
        console.log(res)
        Taro.saveFile({
          tempFilePath: res.tempFilePath
        })
      }
    })
  }

  const setFormValue = (key, value, index=0) => {
    switch (index) {
      case 0:
        setFormData({...formData, [key]: value})
        break
      case 1:
        setSolvedFormData({...solvedFormData, [key]: value})
        break
      case 2:
        setAcceptanceData({...acceptanceData, [key]: value})
    }
  }

  return (
    <View>
      <AtMessage />
      <AtSegmentedControl
        values={['基本信息', '整改', '最终结果']}
        onClick={handleSegmentedControlClick}
        current={current}
      />
      {
        current === 0 &&
        <AtForm
          onSubmit={handleSubmit}
        >
          <AtInput
            name='name'
            title='风险源名称'
            type='text'
            placeholder='输入风险源名称'
            value={formData.name}
            onChange={value => setFormValue('name', value)}
            disabled={!permissions.hazardDetailPageOneEditPermission}
          />
          <Picker mode='selector'
                  range={levels}
                  onChange={handleSafetyHazardLevelChange}
                  value={levelIndex}
                  disabled={!permissions.hazardDetailPageOneEditPermission}
          >
            <AtList>
              <AtListItem
                title='隐患等级'
                extraText={forSafetyHazardLevel(levelIndex)}
              />
            </AtList>
          </Picker>
          <Picker
            mode='selector'
            range={type}
            rangeKey="name"
            onChange={handleTypeChange}
            value={typeIndex}>
            <AtList>
              <AtListItem
                title='隐患类别'
                extraText={type[typeIndex].name}
              />
            </AtList>
          </Picker>
          <View className="form-input_number">
            <Text>期限天数</Text>
            <AtInputNumber
              disabled={!permissions.hazardDetailPageOneEditPermission}
              type="number"
              min={0}
              max={30}
              step={1}
              value={formData.limitedTime}
              onChange={value => setFormValue('limitedTime', value)}
            />
          </View>
          <View className="form-item">
            <View className="form-item-title">
              <HanTitle title="隐患图片"/>
            </View>
            <AtImagePicker
              showAddBtn={permissions.hazardDetailPageOneEditPermission && showAddBtn}
              multiple={true}
              count={3}
              length={3}
              files={files}
              onChange={handleImageChange}
              showDeleteBtn={permissions.hazardDetailPageOneEditPermission}
            />
          </View>

          <View className="form-item">
            <View className="form-item-title">
              <HanTitle title="描述"/>
            </View>
            <View className="form-item-content">

              <AtTextarea
                disabled={!permissions.hazardDetailPageOneEditPermission}
                value={formData.description}
                onChange={value => setFormValue('description', value)}
                maxLength={200}
                placeholder=''
              />
            </View>
          </View>
          <View className="form-item">
            <View className="form-item-title">
              <HanTitle title="措施"/>
            </View>
            <View className="form-item-content">
              <AtTextarea
                disabled={!permissions.hazardDetailPageOneEditPermission}
                value={formData.measures}
                onChange={value => setFormValue('measures', value)}
                maxLength={200}
                placeholder=''
              />
            </View>
          </View>
          <View className="form-submit_btn">
            {
              permissions.hazardDetailPageOneEditPermission &&
              <AtButton type='primary' formType="submit">添加</AtButton>
            }
          </View>
        </AtForm>
      }
      {
        current === 1 &&
        <AtForm
          onSubmit={handleResolveSubmit}
        >
          <Picker
            mode='selector'
            range={solvedLevels}
            onChange={handleStatusChange}
            value={statusIndex}
            disabled={!permissions.hazardDetailPageTwoEditPermission}
          >
            <AtList>
              <AtListItem
                title='整改情况'
                extraText={solvedLevels[statusIndex]}
              />
            </AtList>
          </Picker>
          <View className="form-item flex-wrapper">
            <Text className="form-item-label">
              整改文档
            </Text>

            {/*TODO 删除按钮*/}
            <Text className="file-name">
              {
                file.length === 0 ? '' : file[0].name
              }
            </Text>
            {
              permissions.hazardDetailPageTwoEditPermission &&
              <Button className="file-upload-btn" onClick={handleFileUpload}>
                上传
              </Button>
            }
            {
              !permissions.hazardDetailPageTwoEditPermission &&
              <Button className="file-upload-btn" onClick={handleFileDownload}>
                下载
              </Button>
            }
          </View>
          <View className="form-item">
            <View className="form-item-title">
              <HanTitle title="隐患图片"/>
            </View>
            <AtImagePicker
              showAddBtn={permissions.hazardDetailPageTwoEditPermission}
              multiple={true}
              count={3}
              length={3}
              files={solvedImageFiles}
              onChange={handleSolvedImageChange}
              showDeleteBtn={permissions.hazardDetailPageTwoEditPermission}
            />
          </View>
          <View className="form-submit_btn">
            {
              permissions.hazardDetailPageTwoEditPermission &&
              <AtButton type='primary' formType="submit">提交整改</AtButton>
            }
          </View>

        </AtForm>
      }
      {
        current === 2 &&
        <AtForm
          onSubmit={handleAcceptanceSubmit}
        >
          <Picker
            mode='selector'
            range={acceptanceLevels}
            onChange={handleAcceptanceChange}
            value={acceptanceStatusIndex}
            disabled={!permissions.hazardDetailPageThreeEditPermission}
          >
            <AtList>
              <AtListItem
                title='验收状态'
                extraText={acceptanceLevels[acceptanceStatusIndex]}
              />
            </AtList>
          </Picker>
          <View className="form-item">
            <View className="form-item-title">
              <HanTitle title="验收意见"/>
            </View>
            <View className="form-item-content">
              <AtTextarea
                disabled={!permissions.hazardDetailPageThreeEditPermission}
                value={acceptanceData.acceptanceOpinion}
                onChange={value => setFormValue('acceptanceOpinion', value, 2)}
                maxLength={200}
                placeholder=''
              />
            </View>
          </View>
          <View className="form-submit_btn">
            {
              permissions.hazardDetailPageThreeEditPermission &&
              <AtButton type='primary' formType="submit">验收</AtButton>
            }
          </View>

        </AtForm>
      }
      <Canvas canvasId="myCanvas" style={`width: ${canvasWidth}; height: ${canvasHeight};transform: translateX(-1000px)`}  />
    </View>
  )
}

SafetyHazardDetail.config = {
  navigationBarTitleText: '隐患'
}

export default SafetyHazardDetail







