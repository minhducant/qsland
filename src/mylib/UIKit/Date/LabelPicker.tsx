import React, {useState, forwardRef, useImperativeHandle} from 'react'
import {StyleProp, StyleSheet, Text, View, ViewStyle} from 'react-native'
import {Picker} from '@react-native-picker/picker'
interface Props extends ViewStyle {
  data: Array<any>
  label: string
  style: StyleProp<ViewStyle>
  valueInit: string | undefined
  styleLabel: StyleProp<ViewStyle>
  stylePicker: StyleProp<ViewStyle>
}
const LabelPicker = (props: Props, ref: any) => {
  const {data, label, style, valueInit, styleLabel, stylePicker, ...rest} =
    props
  const [value, setValue] = useState(valueInit ? valueInit : data[0])
  useImperativeHandle(ref, () => ({
    getValue: () => {
      return value
    },
  }))
  return (
    <View {...rest}>
      <Text style={[{width: 100}, styleLabel]}>{label}</Text>
      <Picker
        style={[{width: 200}, stylePicker]}
        selectedValue={value}
        onValueChange={setValue}>
        {data.map((item, index) => (
          <Picker.Item
            key={index}
            label={item ? item : ''}
            value={item ? item : ''}
          />
        ))}
      </Picker>
    </View>
  )
}
export default forwardRef(LabelPicker)
const styles = StyleSheet.create({})
