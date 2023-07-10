import { Image, ImageProps, Modal, ScrollView, StyleProp, StyleSheet, Text, TextStyle, View, ViewProps, ViewStyle, NativeSyntheticEvent, NativeScrollEvent, TextProps, Platform, Dimensions } from 'react-native'
import React, { isValidElement, useEffect, useMemo, useRef, useState } from 'react'
import { Block, IconC, Touch, sleep, LayoutApp, Log } from './dependencies';
import { VideoAndroid, VideoIOS } from './videos';
import { isArray } from 'underscore';
export type ListMediaViewerProps = {
  data?: { uri: string, type: 1 | 2, time_start?: string }[],
  images?: string[]
  videos?: string[]
  onPressItem?: (item: any) => any
  onClose?: () => any
  styleImage?: ImageProps['style']
  styleScrollView?: ImageProps['style']
  styleContainer?: ViewProps['style']
  styleHeader?: ViewProps['style']
  styleFooter?: ViewProps['style']
  styleBadge?: TextProps['style']
  styleIcon?: {
    container?: StyleProp<ViewStyle> | StyleProp<TextStyle>
    icon?: StyleProp<TextStyle>
  }
  renderHeader?: () => React.ReactNode
  propsScrollView?: React.ComponentPropsWithoutRef<typeof ScrollView>
  propsContainer?: React.ComponentPropsWithoutRef<typeof ScrollView>
  background?: string
  pauseOpen?: boolean
  initVisible?: boolean
  disableSafeArea?: boolean
  hiddenClose?: boolean
  isLive?: boolean
}
export type ListMediaViewerRef = {
  open?: () => any
  openIndex?: (index: number) => any
  openIndexSeek?: (index: number, seek?: number) => any
  close?: () => any
}
const pageWidth = Dimensions.get('screen').width
export const ListMediaViewer = React.forwardRef<ListMediaViewerRef, ListMediaViewerProps>((
  {
    data,
    initVisible = false,
    images,
    videos,
    disableSafeArea,
    hiddenClose,
    onPressItem,
    onClose,
    styleHeader,
    styleScrollView,
    styleImage,
    styleContainer,
    styleIcon,
    renderHeader,
    propsScrollView,
    propsContainer,
    background,
    pauseOpen,
    styleFooter,
    styleBadge,
    isLive
  }, ref) => {
  // Log.d('ListMediaViewer', data)
  React.useImperativeHandle(ref, () => ({
    open() {
      setVisible(true)
    },
    async openIndex(index) {
      setVisible(true)
      await sleep(150)
      scrollViewRef.current?.scrollTo({
        x: index * pageWidth,
        y: 0,
        animated: true,
      })
      await sleep(150)
      !pauseOpen && onPlayPage(index)
    },
    async openIndexSeek(index, seek) {
      setVisible(true)
      await sleep(150)
      scrollViewRef.current?.scrollTo({
        x: index * pageWidth,
        y: 0,
        animated: true,
      })
      await sleep(150)
      !pauseOpen && onPlayPage(index, seek || 0)
    },
    close() {
      setVisible(false)
    },
  }))
  const [visible, setVisible] = useState(initVisible)
  const _onClose = () => {
    setVisible(false)
    onClose && onClose()
  }
  // const scrollViewRef = useRef<React.ComponentPropsWithRef<typeof ScrollView>>(null);
  const scrollViewRef = useRef<any>(null);
  const refVideo = useRef<any>({});
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffsetX / pageWidth);
    setCurrentPageIndex(index);
  };

  const onMomentumScrollEnd = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffsetX / pageWidth);
    // Log.e('onMomentumScrollEnd-contentOffsetX', contentOffsetX)
    // Log.e('onMomentumScrollEnd-contentOffsetX / pageWidth', contentOffsetX / pageWidth)
    // Log.e('onMomentumScrollEnd-pageWidth', pageWidth)
    Log.e('onMomentumScrollEnd-index', index)
    onPlayPage(index)
    setCurrentPageIndex(index);
  };
  const page = currentPageIndex >= 0 ? (currentPageIndex + 1) : 1
  const backgroundColor = background || '#000'
  const onPlayPage = (index: string | number, seek?: number) => {
    Log.d('onPlayPage', index)
    Log.d('keys', Object.keys(refVideo.current))
    const keys = Object.keys(refVideo.current)
    keys.forEach((id) => {
      if (index == id) onPlay(id, seek)
      else onPaused(id)
    })
  }
  const onPlay = (index: string | number, seek?: number) => {
    Log.d('onPlay', index)
    if (seek) refVideo.current[index]?.playSeek(seek)
    else refVideo.current[index]?.play()
  }
  const onPaused = (index: string | number) => {
    Log.d('onPaused', index)
    refVideo.current[index]?.pause()
  }
  const listMedia = useMemo(() => {
    let res: any[] = []
    if (isArray(data)) res = [...res, ...data]
    if (isArray(images)) res = [...res, ...images.map(uri => ({ uri, type: 1 }))]
    if (isArray(videos)) res = [...res, ...videos.map(uri => ({ uri, type: 2 }))]
    return res
  }, [data, images, videos])
  const length = listMedia.length
  return (
    <Modal visible={visible}>
      <LayoutApp disable={disableSafeArea} style={{ backgroundColor: backgroundColor }} styleBot={{ backgroundColor: backgroundColor }} forceInsetBot={{ bottom: 'always' }}>
        <Block hidden={hiddenClose} styleBox={[styles.header, styleHeader]}>
          <Touch onPress={_onClose} styleBox={[styles.containerIcon, styleIcon?.container]}>
            <IconC name="close" color='#fff' size={23} style={styleIcon?.icon} />
          </Touch>
          {isValidElement(renderHeader) && renderHeader()}
        </Block>
        <ScrollView
          scrollEventThrottle={16}
          ref={scrollViewRef}
          onScroll={handleScroll}
          onMomentumScrollEnd={onMomentumScrollEnd}
          style={[styles.scrollView, styleScrollView]}
          pagingEnabled horizontal
          showsHorizontalScrollIndicator={false}
          {...propsScrollView}
        >
          {listMedia.map((item, index) => (
            <Touch disabled key={index} onPress={() => onPressItem && onPressItem({ item, index })}
              styleBox={[styles.container, styleContainer]}
              {...propsContainer}
            >
              {item.type == 1 && <Image source={{ uri: item.uri }} style={[styles.image, styleImage]} />}
              {item.type == 2 && Platform.OS == "ios" &&
                <VideoIOS
                  isLive={isLive}
                  timeStart={item?.time_start}
                  ref={ref => refVideo.current[index] = ref}
                  index={index}
                  source={{ uri: item.uri }}
                />
              }
              {item.type == 2 && Platform.OS == "android" &&
                <VideoAndroid
                  isLive={isLive}
                  timeStart={item?.time_start}
                  ref={ref => refVideo.current[index] = ref}
                  index={index}
                  source={{ uri: item.uri }}
                />
              }
            </Touch>
          ))}
        </ScrollView>
        <Block styleBox={[styles.footer, styleFooter]}>
          {__DEV__ && <Text onPress={() => onPlay(0)} style={[styles.badge, styleBadge]}>{'Play'}</Text>}
          <Text style={[styles.badge, styleBadge]}>{page}/{length}</Text>
        </Block>
      </LayoutApp>
    </Modal>
  )
})


const styles = StyleSheet.create({
  footer: {
    height: 20,
    alignItems: 'center',
    justifyContent: 'center'
  },
  badge: {
    color: '#fff'
  },
  header: {
    height: 50,
    paddingHorizontal: 10
  },
  scrollView: { flexDirection: 'row' },
  image: {
    width: pageWidth,
    height: pageWidth,
    resizeMode: 'contain'
  },
  container: {
    height: '100%',
    width: pageWidth,
    justifyContent: 'center'
  },
  containerIcon: {
    width: 40,
    height: 40,
    borderRadius: 100,
    backgroundColor: 'gray',
    alignItems: 'center', justifyContent: 'center',
  }
})
