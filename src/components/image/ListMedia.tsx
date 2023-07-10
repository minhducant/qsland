import { Image, ImageProps, Platform, ScrollView, StyleProp, StyleSheet, Text, TextStyle, View, ViewProps, ViewStyle } from 'react-native'
import React, { isValidElement, useMemo, useRef } from 'react'
import { Block, IconC, Touch } from '@mylib';
import { arrayData } from '@utils/format';
import { VideoAndroid, VideoAndroidProps, VideoIOS } from './videos';
import { isArray } from 'underscore';
import { Log } from '@utils';
export type ListMediaProps = {
  data?: { uri: string, type: 1 | 2, time_start?: string }[],
  images?: string[]
  videos?: string[]
  onPressItem?: ({ item, index, seek }: { item: any, index: number, seek?: number }) => any
  onRemoveItem?: ({ item, index }: { item: any, index: number }) => any
  styleImage?: ImageProps['style']
  styleVideo?: ViewProps['style']
  styleScrollView?: ImageProps['style']
  styleContainer?: ViewProps['style']
  styleIcon?: {
    container?: StyleProp<ViewStyle> | StyleProp<TextStyle>
    icon?: StyleProp<TextStyle>
  }
  renderIcon?: () => React.ReactNode
  propsScrollView?: React.ComponentPropsWithoutRef<typeof ScrollView>
  hiddenClose?: boolean
  autoPause?: number
  showMenu?: boolean
  isLive?: boolean
  propsVideo?: VideoAndroidProps
}
export function ListMedia({ data, isLive, images, videos, autoPause, hiddenClose, onPressItem, onRemoveItem, styleScrollView, styleImage, styleVideo, styleContainer, styleIcon, renderIcon, showMenu, propsScrollView, propsVideo }: ListMediaProps) {
  const refVideoIOS = useRef<any>({});
  const listMedia = useMemo(() => {
    let res: any[] = []
    if (isArray(data)) res = [...res, ...data]
    if (isArray(images)) res = [...res, ...images.map(uri => ({ uri, type: 1 }))]
    if (isArray(videos)) res = [...res, ...videos.map(uri => ({ uri, type: 2 }))]
    return res
  }, [data, images, videos])
  return (
    <ScrollView style={[styles.scrollView, styleScrollView]} pagingEnabled horizontal showsHorizontalScrollIndicator={false} {...propsScrollView}>
      {listMedia.map((item, index) => (
        <Touch
          key={index}
          onPress={() => onPressItem && onPressItem({ item, index, seek: refVideoIOS.current[index]?.getSeek() })}
          styleBox={[styles.container, styleContainer]}
        >
          {item.type == 1 &&
            <Image source={{ uri: item.uri }} style={[styles.image, styleImage]} />}
          {item.type == 2 && Platform.OS == "ios" &&
            <VideoIOS
              isLive={isLive}
              ref={ref => refVideoIOS.current[index] = ref}
              autoPause={autoPause}
              index={index}
              source={{ uri: item.uri }}
              width={100}
              height={100}
              hiddenMenu={!showMenu}
              styleContainer={{ borderRadius: 10 }}
              disableContainer
              styleVideo={styleVideo}
              timeStart={item?.time_start}
              {...propsVideo}
            />}
          {item.type == 2 && Platform.OS == "android" && item?.uri &&
            <VideoAndroid
              isLive={isLive}
              ref={ref => refVideoIOS.current[index] = ref}
              autoPause={autoPause}
              index={index}
              source={{ uri: item.uri }}
              width={100}
              height={100}
              hiddenMenu={!showMenu}
              styleContainer={{ borderRadius: 10 }}
              disableContainer
              styleVideo={styleVideo}
              timeStart={item?.time_start}
              {...propsVideo}
            />}
          {!isValidElement(renderIcon) && (
            <Touch hidden={hiddenClose} onPress={() => onRemoveItem && onRemoveItem({ item, index })}
              styleBox={[styles.containerIcon, styleIcon?.container]}>
              <IconC name="close" color='#fff' size={23} style={styleIcon?.icon} />
            </Touch>
          )}
          {isValidElement(renderIcon) && renderIcon()}
        </Touch>
      ))}
    </ScrollView>
  )
}


const styles = StyleSheet.create({
  scrollView: { flexDirection: 'row' },
  image: {
    width: 100,
    height: 100
  },
  video: {
    width: 300,
    height: 300
  },
  container: {},
  containerIcon: {
    width: 40, height: 40, borderRadius: 100, backgroundColor: 'gray',
    alignItems: 'center', justifyContent: 'center',
    position: 'absolute',
    right: 0
  }
})