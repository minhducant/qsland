import ScreenDeveloper from './ChatScreenIos'
import ChatScreenIos from './ChatScreenIos'
import ChatScreenAndroid from './ChatScreenAndroid'
import { Platform } from 'react-native';

export default {
  ScreenDeveloper: Platform.OS == "android" ? ChatScreenAndroid : ChatScreenIos,
  // ChatScreenIos,
  // ChatScreenAndroid
}