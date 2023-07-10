
import { Linking } from 'react-native';
export const AppLinking = {
  call: (phone: string) => phone && Linking.openURL(`tel:${phone}`),
  sms: (phone: string, content: string) => phone && Linking.openURL(`sms:${phone}/${content}`),
}