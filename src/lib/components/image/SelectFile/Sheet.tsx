import { ScrollView, StyleSheet, Text } from 'react-native'
import React, { useRef } from 'react'
import { arrayData, Block, Touch } from '../dependencies'
import BottomSheet from './BottomSheet'
type SheetBottomProps = {
  data: { name: string }[]
  onPressItem: (item: any) => void
  height: number
}
export const Sheet = React.forwardRef(
  ({ data, onPressItem, height }: SheetBottomProps, ref) => {
    return (
      <BottomSheet ref={ref} height={280}>
        <Block maxHeight={height} borderR={20} overH bgW>
          <ScrollView>
            {arrayData(data).map((item, index) => (
              <Touch
                key={index}
                activeOpacity={0.8}
                row
                onPress={() => onPressItem(item)}
                h={45}
                styleBox={styles.defaultBox}>
                <Text style={styles.text}>{item?.name}</Text>
              </Touch>
            ))}
          </ScrollView>
        </Block>
      </BottomSheet>
    )
  },
)

const styles = StyleSheet.create({
  defaultBox: {
    height: 55,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#e0e0e0',
    backgroundColor: '#fff',
    // borderWidth: 0.5,
  },
  text: {
    fontSize: 18,
    fontWeight: '500',
    color: '#2787f9',
  }
})