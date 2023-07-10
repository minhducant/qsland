import { Alert } from 'react-native';
export const AppAlert = (msg: string, title = "Thông báo") => {
  Alert.alert(title, msg)
}