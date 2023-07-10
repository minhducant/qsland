import React, { useImperativeHandle, forwardRef, useRef } from 'react'
import { Platform } from 'react-native'
import {
  ImageLibraryOptions,
  launchCamera,
  launchImageLibrary,
} from 'react-native-image-picker'
import DocumentPicker, {
  DirectoryPickerResponse,
  DocumentPickerResponse,
  isInProgress,
  types,
} from 'react-native-document-picker'
/////
import { Log } from '@utils'
import {
  android_CAMERA,
  checkCamera,
  checkRecordVideo,
  checkUseLibrary,
  ios_NSCameraUsageDescription,
  ios_NSMicrophoneUsageDescription,
  ios_NSPhotoLibraryAddUsageDescription,
  ios_NSPhotoLibraryUsageDescription,
} from '@utils/prermission'
///
import { setStorage } from '@lib/storage'
import { SheetBottom, SheetBottom2 } from '@components/selected'
import { AppLang } from '@assets/langs'
import { isArray } from 'underscore'
////////
type props = {
  selectionLimit: number
  videoQuality: any
  onSelectedMedia: any
  hideRecord?: any
  options: type[]
}
type type = 'video' | 'library' | 'file' | 'camera'
const SelectMedia = forwardRef((props: props, ref) => {
  const { selectionLimit, onSelectedMedia, videoQuality, options } = props
  useImperativeHandle(ref, () => ({
    open: () => _SheetBottom.current.open(),
    close: () => _SheetBottom.current.close(),
    onLibrary,
    onCamera,
    onRecord,
  }))
  const _SheetBottom = useRef<any>()
  let _options: ImageLibraryOptions = {
    mediaType: 'mixed',
    includeBase64: false,
    includeExtra: true,
    selectionLimit: selectionLimit || 5,
    quality: 1,
    videoQuality: videoQuality || 'high',
    presentationStyle: 'fullScreen',
    // maxWidth: 400, //kich thuoc anh
    // maxHeight: 400, //kich thuoc anh
    // durationLimit: 10 * 60,
  }
  /**
   *
   */
  const onLibrary = () => {
    isOpenLibrary()
    _options.mediaType = 'mixed'
    checkUseLibrary()
    launchImageLibrary(_options, (e: any) => {
      Log.d('onLibrary', e)
      onSelectedMedia && onSelectedMedia(e, 'library')
    })
  }
  /**
   *
   */
  const onCamera = () => {
    isOpenLibrary()
    _options.mediaType = 'photo'
    checkCamera()
    launchCamera(_options, e => {
      Log.d('onCamera', e)
      onSelectedMedia && onSelectedMedia(e, 'camera')
    })
  }
  /**
   *
   */
  const onRecord = () => {
    isOpenLibrary()
    checkRecordVideo()
    _options.mediaType = 'video'
    launchCamera(_options, e => {
      Log.d('onRecord', e)
      onSelectedMedia && onSelectedMedia(e, 'video')

    })
  }
  /**
   *
   */
  const onFile = () => {
    isOpenLibrary()
    checkRecordVideo()
    DocumentPicker.pickMultiple({
      allowMultiSelection: true,
      type: [
        types.doc,
        types.docx,
        types.pdf,
        types.xls,
        types.ppt,
        types.pptx,
        types.xlsx,
        types.images,
        types.video,
      ],
    })
      .then(e => {
        Log.d('pickMultiple', e)
        onSelectedMedia && onSelectedMedia(e, 'file')
      })
      .catch(e => {
        onSelectedMedia([])
        console.log(e)
      })
  }
  const isOpenLibrary = async () => {
    Platform.OS == 'android' && setStorage('isOpenLibrary', 'true')
  }
  const onPressItem = async (item: any) => {
    // console.log('item', item)
    const type = item.value
    if (type == 1) return onRecord()
    if (type == 2) return onCamera()
    if (type == 3) return onLibrary()
    if (type == 4) return onFile()
  }
  const data = options ? extraOptions(options) : extraOptions(['video', 'camera', 'library'])
  return (
    <SheetBottom2 ref={_SheetBottom} data={data} onPressItem={onPressItem} />
  )
})

export default SelectMedia
const extraOptions = (data: string[]) => {
  let res: any[] = []
  if (isArray(data))
    data.forEach(type => {
      res.push(Options[type])
    })
  return res
}
const Options: any = {
  video: { name: AppLang('quay_video'), value: 1, icon: 'videocam-outline' },
  camera: { name: AppLang('chup_anh'), value: 2, icon: 'camera-outline' },
  library: { name: AppLang('thu_vien'), value: 3, icon: 'images-outline' },
  file: { name: AppLang('chon_tep'), value: 4, icon: 'folder-outline' },
}
