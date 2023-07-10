import { StyleSheet } from 'react-native'
import { Dimensions } from 'react-native';
export const AppStyle = StyleSheet.create({
  title: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  content: {
    fontSize: 14,
    textAlign: 'center',
  },

})
export const AppValue = {
  width: Dimensions.get('screen').width,
  height: Dimensions.get('screen').height,
}