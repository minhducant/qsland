const DISABLE = true
import { Alert } from 'react-native';
export const CheckDev = (fc?: any) => {
  if (typeof fc == "function") {
    if (DISABLE) return Alert.alert('Thông báo', "Tính năng đang phát triển")
    fc()
  }
  return Alert.alert('Thông báo', "Tính năng đang phát triển")
}