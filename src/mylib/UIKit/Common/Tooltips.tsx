import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { Block } from '@mylib';
import Tooltip, { TooltipProps } from 'react-native-walkthrough-tooltip';

export type TooltipProps1 = TooltipProps & {
  children?: any
  content?: any
  autoOpen?: boolean
}
const Tooltips = React.forwardRef(({ children, content, ...props }: TooltipProps1, ref) => {
  React.useImperativeHandle(ref, () => ({
    open() {
      setVisible(true)
    },
    close() {
      setVisible(false)
    },
  }))
  const [visible, setVisible] = useState<boolean>(false)
  if (props.autoOpen) {
    return (
      <Tooltip
        isVisible={visible}
        content={content}
        placement="bottom"
        onClose={() => setVisible(false)}
        backgroundColor="#000000CA"
        contentStyle={{ backgroundColor: '#fff' }}
        {...props}
      >
        <TouchableOpacity onPress={() => setVisible(true)}>
          {children}
        </TouchableOpacity>
      </Tooltip>
    )
  }
  return (
    <Tooltip
      isVisible={visible}
      content={content}
      placement="bottom"
      onClose={() => setVisible(false)}
      backgroundColor="#000000CA"
      contentStyle={{ backgroundColor: '#fff' }}
      {...props}
    >
      {children}
    </Tooltip>
  )
})
export default Tooltips
const styles = StyleSheet.create({})