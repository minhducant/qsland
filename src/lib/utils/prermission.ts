import { Alert, Linking, PermissionsAndroid, Platform } from 'react-native'
import Permissions, {
  requestNotifications,
  check,
  PERMISSIONS,
  request,
  RESULTS,
  openSettings,
  checkMultiple,
} from 'react-native-permissions'
import { Log } from './Log'
//*****IOS
/**
 * Camera IOS
 */
export const ios_NSCameraUsageDescription = () => {
  Log.g('ios_NSCameraUsageDescription')
  try {
    checkRequest(PERMISSIONS.IOS.CAMERA)
  } catch (err) {
    console.warn(err)
  }
}
/**
 * Microphone
 */
export const ios_NSMicrophoneUsageDescription = () => {
  try {
    checkRequest(PERMISSIONS.IOS.MICROPHONE)
  } catch (err) {
    console.warn(err)
  }
}
/**
 * LibraryAdd
 */
export const ios_NSPhotoLibraryAddUsageDescription = () => {
  Log.g('ios_NSPhotoLibraryAddUsageDescription')
  try {
    checkRequest(PERMISSIONS.IOS.PHOTO_LIBRARY_ADD_ONLY)
  } catch (err) {
    console.warn(err)
  }
}
/**
 * LibraryUsage
 */
export const ios_NSPhotoLibraryUsageDescription = () => {
  Log.g('ios_NSPhotoLibraryUsageDescription')
  try {
    checkRequest(PERMISSIONS.IOS.PHOTO_LIBRARY)
  } catch (err) {
    console.warn(err)
  }
}
/**
 *
 *
 *
 * ANDROID
 */
/**
 * CAMERA
 */
export const android_CAMERA = async () => {
  try {
    checkRequest(PERMISSIONS.ANDROID.CAMERA)
  } catch (err) {
    console.warn(err)
  }
}
/**
 *WRITE
 */
export const android_WRITE_EXTERNAL_STORAGE = () => {
  try {
    checkRequest(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE)
  } catch (err) {
    console.warn(err)
  }
}
/**
 *READ
 */
export const android_READ_EXTERNAL_STORAGE = () => {
  try {
    checkRequest(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE)
  } catch (err) {
    console.warn(err)
  }
}
/**
 *RECORD
 */
export const android_RECORD_AUDIO = () => {
  try {
    checkRequest(PERMISSIONS.ANDROID.RECORD_AUDIO)
  } catch (err) {
    console.warn(err)
  }
}
/**
 *VIBRATE
 */
export const android_VIBRATE = () => {
  try {
  } catch (err) {
    console.warn(err)
  }
}
/** */
export const checkRequest = (permission: any) => {
  check(permission)
    .then(result => {
      console.log('RESULT', permission, result)
      switch (result) {
        case RESULTS.UNAVAILABLE:
          console.log(
            'Tính năng này không khả dụng (trên thiết bị này / trong ngữ cảnh này)',
          )
          break
        case RESULTS.DENIED:
          console.log(
            'Quyền chưa được yêu cầu / bị từ chối nhưng có thể yêu cầu',
          )
          Platform.OS == 'android' && Linking.openSettings()
          break
        case RESULTS.LIMITED:
          console.log('Quyền bị hạn chế: có thể thực hiện một số hành động')
          // Linking.openSettings()
          break
        case RESULTS.GRANTED:
          console.log('Quyền được cấp')
          break
        case RESULTS.BLOCKED:
          // Linking.openSettings()
          console.log('Quyền bị từ chối và không thể yêu cầu được nữa')
          break
      }
    })
    .catch(error => { })
}

//////////////
export const checkRecordVideo = async () => {
  Platform.OS == 'ios' ? ios_NSCameraUsageDescription() : android_CAMERA()
  Platform.OS == 'ios' && ios_NSMicrophoneUsageDescription()
  Platform.OS == 'ios'
    ? ios_NSPhotoLibraryUsageDescription()
    : android_WRITE_EXTERNAL_STORAGE()
}
export const checkUseLibrary = async () => {
  Platform.OS == 'ios'
    ? ios_NSPhotoLibraryUsageDescription()
    : android_READ_EXTERNAL_STORAGE()
}
export const checkCamera = async () => {
  Platform.OS == 'ios' ? ios_NSCameraUsageDescription() : android_CAMERA()
  Platform.OS == 'ios' && ios_NSPhotoLibraryUsageDescription()
}
export const checkWiteFile = async () => {
  Platform.OS == 'ios'
    ? ios_NSPhotoLibraryUsageDescription()
    : android_WRITE_EXTERNAL_STORAGE()
  Platform.OS == 'ios'
    ? ios_NSPhotoLibraryUsageDescription()
    : android_READ_EXTERNAL_STORAGE()
}
