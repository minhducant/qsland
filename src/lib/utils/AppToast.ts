import { Platform } from "react-native";
import { Toast } from "react-native-toast-message/lib/src/Toast";

export const ToastErr = (msg: string, title = "Thông báo", onPress?: () => void) => {
  Toast.show({
    type: 'error',
    text1: title,
    text2: msg,
    onPress: () => onPress && onPress(),
  });
}
export const ToastSuccess = (msg: string, title = "Thông báo", onPress?: () => void) => {
  Toast.show({
    type: 'success',
    text1: title,
    text2: msg,
    onPress: () => onPress && onPress(),
  });
}