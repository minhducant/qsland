import { StyleSheet, Text, View } from 'react-native'
import { Dimensions } from 'react-native';

export const styleInput = StyleSheet.create({
  title: {
    fontWeight: '500',
    fontSize: 15
  },
  titleContainer: {
    padding: 10,
    // backgroundColor: 'pink'
  },
  titleRequire: {},
  inputContainer: {
    marginVertical: 2,
    overflow: 'hidden'
    // backgroundColor: 'blue'
  },
  inputButton: {
    backgroundColor: '#eee',
    minHeight: 40,// Dimensions.get('screen').width * 0.12,
    borderRadius: 1000,
    overflow: 'hidden',
    paddingHorizontal: 10,
    // alignItems: 'center',
    // flexDirection: 'row',
    // justifyContent: 'space-between'

  }

})
export const placeholderTextColor = "#9AB0C9"