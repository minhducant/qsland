import { View } from 'react-native'
import React, { useState } from 'react'
import { styleInput } from './styleInput'
import InputTitle from './InputTitle'
import ListView from '@lib/components/ListView'
import { IconApp, TextApp, Touch } from '@lib/components'
import { isObject } from 'underscore'
type Props = {
  title?: string
  titleSelect?: string
  valueInit?: any
  data?: any[]
  required?: boolean
  keyString?: string
  onOpenModal?: () => void
  onSelected?: (item: any) => void
  placeholder?: string
  onRefreshData?: () => void
  horizontal?: boolean
}
const InputRadio = React.forwardRef<any, Props>(({ title, valueInit, placeholder,
  required, data, keyString = 'name', onOpenModal, onSelected, titleSelect, horizontal, ...props }, ref) => {
  const [value, setValue] = useState<any>(null)
  React.useImperativeHandle(ref, () => ({
    getValue: (keyString?: string) => {
      if (keyString && isObject(value)) return value[keyString]
      return value
    },
    setValue: (item: any) => setValue({ ...item, name: item[keyString] }),
    clearValue: () => setValue(null)
  }))
  return (
    <View style={styleInput.inputContainer}>
      <InputTitle title={title} required={required} />
      <View style={[styleInput.inputButton, { borderRadius: 10, }]}>
        <ListView
          horizontal={horizontal}
          style={{ marginTop: 5 }}
          keyExtractor={(i, j) => j.toString()}
          renderItem={({ item }) =>
            <BottomItem name={item[keyString]}
              onPress={() => {
                setValue({ ...item, name: item[keyString] });
                onSelected && onSelected(item)
              }}
              v1={JSON.parse(JSON.stringify({ ...item, name: item[keyString] }))}
              v2={JSON.parse(JSON.stringify(value))}
              active={JSON.stringify({ ...item, name: item[keyString] }) === JSON.stringify(value)}
            />
          }
          data={data}
        />
      </View>
    </View>
  );
});
const BottomItem = ({ name, onPress, style, active, v1, v2 }: any) => {
  const icon = active ? 'radio-button-on-outline' : 'radio-button-off-outline'
  return (
    <Touch onPress={onPress}
      row alignCenter
      pad={5} borderC="#ddd" styleBox={style}>
      <IconApp name={icon} color="gray" />
      <TextApp style={{ marginLeft: 5 }}>{name}</TextApp>
    </Touch>
  )
}
export default InputRadio
