import React, { useImperativeHandle, forwardRef, useRef } from 'react'
import { Platform, } from 'react-native'
import { CameraOptions, ImageLibraryOptions, launchCamera, launchImageLibrary, } from 'react-native-image-picker'
// import DocumentPicker, { types, } from 'react-native-document-picker'
// import { checkCamera, checkRecordVideo, checkUseLibrary, } from '@utils/prermission'
import { isArray } from 'underscore';
import moment from 'moment'
import RNFS from 'react-native-fs';
import { Sheet } from './Sheet'
import { checkCamera } from '@utils/prermission';
import { Log } from '@utils/Log';

////////
type SelectFileProps = {
  onSelectedFile: any
  options: type[],
  launchCamera?: CameraOptions
  launchLibrary?: ImageLibraryOptions
  selectionLimit?: number
}
type type = "video" | 'library' | 'file' | 'camera'
export const SelectFile = forwardRef((props: SelectFileProps, ref) => {
  const { onSelectedFile, options } = props
  useImperativeHandle(ref, () => ({
    ..._SheetBottom.current,
    onLibrary, onCamera, onRecord
  }))
  const _SheetBottom = useRef<any>()
  let _options: ImageLibraryOptions = {
    mediaType: 'mixed',
    includeBase64: false,
    includeExtra: true,
    selectionLimit: props?.selectionLimit ?? 5,
    quality: 1,
    videoQuality: 'high',
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
    // checkUseLibrary()
    launchImageLibrary(_options, (e: any) => {
      Log.d('onLibrary', e)
      onSelectedFile && onSelectedFile(e.assets, 'library')
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
      onSelectedFile && onSelectedFile(e.assets, 'camera')
    })
      .catch(e => console.log('e', e))
  }
  /**
   *  
   */
  const onRecord = () => {
    try {
      isOpenLibrary()
      // checkRecordVideo()
      launchCamera({ ..._options, mediaType: 'video' }, e => {
        Log.d('onRecord', e)
        if (e.assets) {
          if (e.assets.length > 0) {
            if (Platform.OS == "android") {
              let videoAsset = e.assets[0]
              Log.d('videoAsset', videoAsset.timestamp)
              Log.d('videoAsset', new Date())
              let timestart = subtractSeconds(new Date(DateConvertUTC(videoAsset.timestamp)), videoAsset?.duration)
              const oldFilePath: any = videoAsset.uri;
              // onSelectedFile && onSelectedFile(e, 'video')
              const newFileName = DateConvert(new Date()) + `timestart${timestart}timestart.mp4`
              videoAsset.fileName = newFileName
              const newFilePath = RNFS.CachesDirectoryPath + '/' + newFileName
              RNFS.moveFile(oldFilePath, newFilePath)
                .then(() => {
                  videoAsset.uri = 'file://' + newFilePath
                  console.log('Success: ');
                  onSelectedFile && onSelectedFile(e.assets, 'video')
                })
                .catch((error) => {
                  onSelectedFile && onSelectedFile(e.assets, 'video')
                });
            } else {
              onSelectedFile && onSelectedFile(e.assets, 'video')
            }
            return
          }
        }
      })
    } catch (error) {
      alert(JSON.stringify(error))
    }
  }
  /**
   * 
   */
  const onFile = () => {
    // isOpenLibrary()
    // // checkRecordVideo()
    // DocumentPicker.pickMultiple({
    //   allowMultiSelection: true,
    //   type: [
    //     types.doc,
    //     types.docx,
    //     types.pdf,
    //     types.xls,
    //     types.ppt,
    //     types.pptx,
    //     types.xlsx,
    //     types.images,
    //   ],
    // })
    //   .then((e) => {
    //     Log.d('pickMultiple', e)
    //     onSelectedFile && onSelectedFile(e, 'file')
    //   })
    //   .catch(e => {
    //     onSelectedFile([])
    //     console.log(e)
    //   })
  }
  const isOpenLibrary = async () => {
    // Platform.OS == 'android' && setStorage('isOpenLibrary', 'true')
  }
  const onPressItem = async (item: any) => {
    // console.log('item', item)
    const type = item.value
    if (type == 1) return onRecord()
    if (type == 2) return onCamera()
    if (type == 3) return onLibrary()
    if (type == 4) return onFile()
  }
  const data = options ? extraOptions(options) : extraOptions(['video', 'camera', 'library'])//, 'file'])
  const heightBox = () => {
    if (!options) return 280
    if (isArray(options)) {
      if (options.length == 2) return 230
    }
  }
  return (
    <Sheet
      ref={_SheetBottom}
      data={data}
      onPressItem={onPressItem}
      height={300}
    />
  )
})

const extraOptions = (data: string[]) => {
  let res: any[] = []
  data.forEach(type => {
    res.push(Options[type])
  })
  return res

}
const Lang = {
  video: 'Video',
  camera: 'Camera',
  library: 'Thư viện',
  file: 'File',
}
const Options: any = {
  video: { name: Lang.video, value: 1, icon: 'videocam-outline' },
  camera: { name: Lang.camera, value: 2, icon: 'camera-outline' },
  library: { name: Lang.library, value: 3, icon: 'images-outline' },
  file: { name: Lang.file, value: 4, icon: 'folder-outline' },
}
function subtractSeconds(date: any, seconds: number) {
  date.setSeconds(date.getSeconds() - seconds);

  return DateConvert(date)
}
const DateConvert = (date: any) => moment(date).format('YYYYMMDDHHmmss')
const DateConvertUTC = (date: any) => moment(date, 'YYYY-MM-DDTHH:mm:ss.SSSZ').utc().format('YYYY/MM/DD HH:mm:ss')
