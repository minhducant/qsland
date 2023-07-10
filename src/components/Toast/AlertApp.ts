import {Alert} from 'react-native'
import {AppLang} from '@assets/langs'

export const AlertApp = (message: string) => {
  Alert.alert(AppLang('thong_bao'), message)
}
export const AlertWarning = (onDelete: () => void, mess: string) => {
  Alert.alert(AppLang('canh_bao'), mess, [
    {
      text: AppLang('huy'),
    },
    {
      text: AppLang('dong_y'),
      onPress: async () => {
        typeof onDelete == 'function' && onDelete()
      },
    },
  ])
}
