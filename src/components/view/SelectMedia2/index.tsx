import React, { useImperativeHandle, forwardRef, useRef } from 'react'
import { Platform, } from 'react-native'
import { ImageLibraryOptions, launchCamera, launchImageLibrary, } from 'react-native-image-picker'
import DocumentPicker, { types, } from 'react-native-document-picker'
import { Log } from '@utils'
import { checkCamera, checkRecordVideo, checkUseLibrary, } from '@utils/prermission'
import { setStorage } from '@lib/storage'
import { SheetBottom2 } from '@components/selected'
import { AppLang } from '@assets/langs'
import { isArray } from 'underscore';
import moment from 'moment'
import RNFS from 'react-native-fs';
import { AlertApp } from '@components';

////////
type SelectMedia_ = {
  selectionLimit?: number
  videoQuality?: any
  onSelectedMedia: any
  options: type[]
}
type type = "video" | 'library' | 'file' | 'camera'
const SelectMedia2 = forwardRef((props: SelectMedia_, ref) => {
  const { selectionLimit, onSelectedMedia, videoQuality, options } = props
  useImperativeHandle(ref, () => ({
    ..._SheetBottom.current,
    onLibrary, onCamera, onRecord
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
    try {
      isOpenLibrary()
      checkRecordVideo()
      launchCamera({ ..._options, mediaType: 'video' }, e => {
        Log.d('onRecord', e)
        if (e.assets) {
          if (e.assets.length > 0) {
            if (Platform.OS == "android") {
              let videoAsset = e.assets[0]
              Log.d('videoAsset', videoAsset.timestamp)
              Log.d('videoAsset', new Date())
              let timestart = subtractSeconds(new Date(DateConvertUTC(videoAsset.timestamp)), videoAsset?.duration)
              const oldFilePath = videoAsset.uri;
              // onSelectedMedia && onSelectedMedia(e, 'video')
              const newFileName = DateConvert(new Date()) + `timestart${timestart}timestart.mp4`
              videoAsset.fileName = newFileName
              const newFilePath = RNFS.CachesDirectoryPath + '/' + newFileName
              RNFS.moveFile(oldFilePath, newFilePath)
                .then(() => {
                  videoAsset.uri = 'file://' + newFilePath
                  console.log('Success: ');
                  onSelectedMedia && onSelectedMedia(e, 'video')
                })
                .catch((error) => {
                  onSelectedMedia && onSelectedMedia(e, 'video')
                });
            } else {
              onSelectedMedia && onSelectedMedia(e, 'video')
            }
            return
          }
        }
      })
    } catch (error) {
      AlertApp(JSON.stringify(error))
    }
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
      ],
    })
      .then((e) => {
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
  const data = options ? extraOptions(options) : extraOptions(['video', 'camera', 'library', 'file'])
  const heightBox = () => {
    if (!options) return 280
    if (isArray(options)) {
      if (options.length == 2) return 230
    }
  }
  return (
    <SheetBottom2
      ref={_SheetBottom}
      data={data}
      onPressItem={onPressItem}
      options={{ heightBox: heightBox() }}
    />
  )
})
export default SelectMedia2
const extraOptions = (data: string[]) => {
  let res: any[] = []
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
function subtractSeconds(date: any, seconds: number) {
  date.setSeconds(date.getSeconds() - seconds);

  return DateConvert(date)
}
const DateConvert = (date: any) => moment(date).format('YYYYMMDDHHmmss')
const DateConvertUTC = (date: any) => moment(date, 'YYYY-MM-DDTHH:mm:ss.SSSZ').utc().format('YYYY/MM/DD HH:mm:ss')
