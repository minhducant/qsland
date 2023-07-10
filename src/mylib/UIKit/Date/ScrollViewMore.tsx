import {
  ScrollView,
  StyleSheet,
  ScrollViewProps,
  RefreshControl,
  RefreshControlProps,
  View,
  StyleProp,
  ViewStyle,
} from 'react-native'
import React from 'react'

const isCloseToBottom = (nativeEvent: any, paddingToBottom: any) => {
  const {layoutMeasurement, contentOffset, contentSize} = nativeEvent
  return (
    layoutMeasurement.height + contentOffset.y >=
    contentSize.height - paddingToBottom
  )
}
interface props extends ScrollViewProps, RefreshControlProps {
  onEndReached: () => void
  paddingToBottom?: any
  contentContainerStyle?: StyleProp<ViewStyle>
}
export default function ScrollViewMore ({
  onEndReached,
  children,
  refreshing,
  onRefresh,
  paddingToBottom = 30,
  contentContainerStyle,
}: props) {
  return (
    <ScrollView
      onScroll={({nativeEvent}) => {
        if (isCloseToBottom(nativeEvent, paddingToBottom)) {
          onEndReached()
        }
      }}
      scrollEventThrottle={400}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      <View style={contentContainerStyle}>{children}</View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({})
