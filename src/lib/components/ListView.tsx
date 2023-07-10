import { View, ViewProps } from 'react-native'
import React from 'react'
type props = {
  data?: any
  renderItem: ({ item, index }: { item: any, index: number }) => React.ReactElement
  keyExtractor: (item: any, index: number) => string
  style?: ViewProps['style']
  horizontal?: boolean
  numberColumn?: number
}

export default function ListView({ data = [], renderItem, keyExtractor, style, horizontal }: props) {
  if (!Array.isArray(data)) return null
  return (
    <View style={[{ ...horizontal && { flexDirection: 'row' } }, style]}>
      {Array.isArray(data) && data.map((item, index) =>
        <View key={keyExtractor(item, index)}>
          {renderItem({ item, index })}
        </View>
      )}
    </View>
  )
}

//number column
import { chunk } from 'underscore'
interface Props2 {
  data?: any
  renderItem: ({ item, index }: { item: any, index: number }) => React.ReactElement
  keyExtractor: (item: any, index: number) => string
  style?: ViewProps['style']
  horizontal?: boolean
  numberColumn?: number
  styleRow?: ViewProps['style']
  styleCell?: ViewProps['style']
  styleContainer?: ViewProps['style']
}
export function ListColumn({ data = [], renderItem, keyExtractor, styleRow, styleContainer, styleCell, numberColumn = 1 }: Props2) {
  if (!Array.isArray(data)) return null
  const ListData = chunk(data, numberColumn)
  return (
    <View style={styleContainer} >
      {ListData.map((rows, rowId) =>
        <View key={rowId} style={[{ flexDirection: 'row' }, styleRow]}>
          {rows.map((item, index) =>
            <View style={styleCell} key={keyExtractor(item, index)}>
              {renderItem({ item, index })}
            </View>
          )}
        </View>
      )}
    </View>
  )
}