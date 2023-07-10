import { Alert, Platform } from 'react-native'
import {
  check,
  checkMultiple,
  openSettings,
  PERMISSIONS,
  request,
  RESULTS,
} from 'react-native-permissions'
import RNFS, {
  DownloadBeginCallbackResult,
  DownloadFileOptions,
  DownloadProgressCallbackResult,
} from 'react-native-fs'
import CameraRoll from '@react-native-camera-roll/camera-roll'
import { Log } from '@utils'
import FileViewer from 'react-native-file-viewer'
import { isEmpty, isString } from 'underscore'
import moment from 'moment'
import { ToastAppSuccess, ToastAppError } from '@components'

export function getUrlExtension(url: any) {
  return url.split(/[#?]/)[0].split('.').pop().trim()
}
export function getUrlName(url: any) {
  return url
    .split(/(\\|\/)/g)
    .pop()
    .split('.')[0]
}
export function getNameExtension(url: any) {
  return url.split(/(\\|\/)/g).pop()
}
export const getTypeFile = (filename: any) => {
  if (isString(filename)) {

    return filename.split('.').pop()
  }
  return ""
}
export const checkPermissionWrite = async () => {
  let response: any = await check(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE)

  // console.log(response)
  if (response === RESULTS.BLOCKED) {
    Alert.alert('Thông báo', 'Bạn cần cho phép ứng dụng sử dụng bộ nhớ.', [
      {
        text: 'Hủy',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'Đồng ý',
        onPress: () =>
          openSettings().catch(() => console.log('cannot open settings')),
      },
    ])
  }
  //get by
  let isPermissionsGranted = false
  if (response === RESULTS.GRANTED) {
    isPermissionsGranted = true
  } else if (response === RESULTS.DENIED) {
    response = request(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE, {
      title: 'Thông báo',
      message: 'Bạn cần cho phép ứng dụng sử dụng bộ nhớ',
      buttonPositive: 'Đồng ý',
      buttonNegative: 'Không',
    })

    if (response === RESULTS.GRANTED) {
      isPermissionsGranted = true
    } else if (response === RESULTS.DENIED) {
      await openSettings()
    }
  }

  return isPermissionsGranted
}
export const checkPMIos = async () => {
  // checkMultiple([PERMISSIONS.IOS.CAMERA, PERMISSIONS.IOS.FACE_ID]).then(
  //   statuses => {
  //     console.log('Camera', statuses[PERMISSIONS.IOS.CAMERA])
  //     console.log('FaceID', statuses[PERMISSIONS.IOS.FACE_ID])
  //   },
  // )
  check(PERMISSIONS.IOS.PHOTO_LIBRARY)
    .then(result => {
      switch (result) {
        case RESULTS.UNAVAILABLE:
          console.log(
            'This feature is not available (on this device / in this context)',
          )
          // openSettings()
          request(PERMISSIONS.IOS.PHOTO_LIBRARY)
          break
        case RESULTS.DENIED:
          console.log(
            'The permission has not been requested / is denied but requestable',
          )

          break
        case RESULTS.GRANTED:
          console.log('The permission is granted')
          break
        case RESULTS.BLOCKED:
          openSettings()
          console.log('The permission is denied and not requestable anymore')
          break
      }
    })
    .catch(error => {
      // …
    })
}
const fmNameQrcode = (item: any, defaultFile: any = false) => {
  let __file = getUrlExtension(item)

  if (defaultFile) __file = defaultFile
  let name = 'qr_code' + new Date().getTime()
  Log.e('__file', __file)
  let first =
    Platform.OS === 'ios'
      ? RNFS.LibraryDirectoryPath
      : RNFS.DocumentDirectoryPath
  return `${first}/${'qr_code'}.png`
}
export const DownImage = async (item: any) => {
  if (Platform.OS === 'ios') {
    let check2 = await checkPMIos()
  }
  let check = await checkPermissionWrite()

  // return
  // if (!check) return
  if (isEmpty(item)) return console.log('item null')
  // console.log('donw')
  let options = {
    fromUrl: item,
    toFile: fmNameQrcode(item, 'png'),
  }
  // Log.e('options', options)
  RNFS.downloadFile(options)
    .promise.then(() => FileViewer.open(fmNameQrcode(item, 'png')))
    .then(() => {
      // success
      // Log.g('RNFS.downloadFile-success')
      CameraRoll.save(fmNameQrcode(item), { type: 'photo', album: 'QR-CODE' })
        .then(() => {
          ToastAppSuccess('Tải xuống thành công')
        })
        .catch(err => {
          console.log('=-=-=-=', err)
          ToastAppError('Tải xuống thất bại')
        })
    })
    .catch(error => {
      // error
    })
}
export const getIconFile: any = (type: string) => {
  const newType = type.toLowerCase()
  switch (newType) {
    case 'jpg':
      return require('./img/jpg.png')
    case 'docs':
      return require('./img/docs.png')
    case 'gif':
      return require('./img/gif.png')
    case 'jpeg':
      return require('./img/jpeg.png')
    case 'png':
      return require('./img/png.png')
    case 'pdf':
      return require('./img/pdf.png')
    case 'xlsx':
      return require('./img/xlsx.png')
    case 'pptx':
      return require('./img/pptx.png')
    case 'txt':
      return require('./img/txt.png')
    case 'mp4':
      return require('./img/mp4.png')
    default:
      return require('./img/any.png')
  }
}
