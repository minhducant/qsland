import {Alert, PermissionsAndroid} from 'react-native'
import Permissions, {
  requestNotifications,
  check,
  PERMISSIONS,
  request,
  RESULTS,
  openSettings,
  checkMultiple,
} from 'react-native-permissions'

export async function checkPesCamera () {
  checkMultiple([PERMISSIONS.IOS.CAMERA, PERMISSIONS.IOS.FACE_ID]).then(
    statuses => {
      console.log('Camera', statuses[PERMISSIONS.IOS.CAMERA])
      console.log('FaceID', statuses[PERMISSIONS.IOS.FACE_ID])
    },
  )
  // return
  let response: any = await check(PERMISSIONS.ANDROID.CAMERA) // <-- always blocked
  console.log(response)
  if (response === RESULTS.BLOCKED) {
    Alert.alert('Thông báo', 'Bạn cần cho phép ứng dụng sử dụng camera.', [
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
    response = request(PERMISSIONS.ANDROID.CAMERA, {
      title: 'Thông báo',
      message: 'Bạn cần cho phép ứng dụng sử dụng camera',
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
export async function checkPesVoice () {
  let response: any = await check(PERMISSIONS.ANDROID.RECORD_AUDIO) // <-- always blocked
  console.log(response)
  if (response === RESULTS.BLOCKED) {
    Alert.alert('Thông báo', 'Bạn cần cho phép ứng dụng sử dụng micro', [
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
    response = request(PERMISSIONS.ANDROID.RECORD_AUDIO, {
      title: 'App requires permission,...',
      message:
        'App needs access to your location so you can see your position,...',
      buttonPositive: 'Ok',
      buttonNegative: "Don't show my position,....",
    })

    if (response === RESULTS.GRANTED) {
      isPermissionsGranted = true
    } else if (response === RESULTS.DENIED) {
      await openSettings()
    }
  }

  return isPermissionsGranted
}
const getPermissionAndroid_WRITE_EXTERNAL_STORAGE = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      {
        title: 'Image Download Permission',
        message: 'Your permission is required to save images to your device',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    )
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      return true
    }
    Alert.alert(
      'Save remote Image',
      'Grant Me Permission to save Image',
      [{text: 'OK', onPress: () => console.log('OK Pressed')}],
      {cancelable: false},
    )
  } catch (err) {
    Alert.alert(
      'Save remote Image',
      'Failed to save Image: ' + err.message,
      [{text: 'OK', onPress: () => console.log('OK Pressed')}],
      {cancelable: false},
    )
  }
}
export const checkPermissionT = () => {
  check(PERMISSIONS.IOS.LOCATION_ALWAYS)
    .then(result => {
      switch (result) {
        case RESULTS.UNAVAILABLE:
          console.log(
            'This feature is not available (on this device / in this context)',
          )
          break
        case RESULTS.DENIED:
          console.log(
            'The permission has not been requested / is denied but requestable',
          )
          break
        case RESULTS.LIMITED:
          console.log('The permission is limited: some actions are possible')
          break
        case RESULTS.GRANTED:
          console.log('The permission is granted')
          break
        case RESULTS.BLOCKED:
          console.log('The permission is denied and not requestable anymore')
          break
      }
    })
    .catch(error => {})
}
