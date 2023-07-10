import { Image, ImageProps, Modal, ScrollView, StyleProp, StyleSheet, Text, TextStyle, View, ViewProps, ViewStyle, NativeSyntheticEvent, NativeScrollEvent } from 'react-native'
import React, { isValidElement, useRef, useState } from 'react'
import { Block, IconC, Touch } from '@mylib';
import { arrayData } from '@utils/format';
import { LayoutApp } from '..';
import { screen_width } from '@components';
import { Log } from '@utils';
export type ListImageViewerProps = {
  data: { uri: string }[],
  onPressItem?: (item: any) => any
  onClose?: () => any
  styleImage?: ImageProps['style']
  styleScrollView?: ImageProps['style']
  styleContainer?: ViewProps['style']
  styleHeader?: ViewProps['style']
  styleIcon?: {
    container?: StyleProp<ViewStyle> | StyleProp<TextStyle>
    icon?: StyleProp<TextStyle>
  }
  renderHeader?: () => React.ReactNode
  propsScrollView?: React.ComponentPropsWithoutRef<typeof ScrollView>
  propsContainer?: React.ComponentPropsWithoutRef<typeof ScrollView>
}
export type ListImageViewerRef = {
  open?: () => any
  openIndex?: (index: number) => any
  close?: () => any
}
const pageWidth = screen_width
export const ListImageViewer = React.forwardRef<ListImageViewerRef, ListImageViewerProps>((
  {
    data,
    onPressItem,
    onClose,
    styleHeader,
    styleScrollView,
    styleImage,
    styleContainer,
    styleIcon,
    renderHeader,
    propsScrollView,
    propsContainer
  }, ref) => {
  React.useImperativeHandle(ref, () => ({
    open() {
      setVisible(true)
    },
    openIndex(index) {
      Log.d('openIndex')
      setVisible(true)
      setTimeout(() => {
        scrollViewRef.current?.scrollTo({
          x: index * pageWidth,
          y: 0,
          animated: true,
        })
      }, 150);
    },
    close() {
      setVisible(false)
    },
  }))
  const [visible, setVisible] = useState(false)
  const _onClose = () => {
    setVisible(false)
    onClose && onClose()
  }
  // const scrollViewRef = useRef<React.ComponentPropsWithRef<typeof ScrollView>>(null);
  const scrollViewRef = useRef<any>(null);
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const index = Math.floor(contentOffsetX / pageWidth);
    setCurrentPageIndex(index);
  };

  const handleMomentumScrollEnd = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const index = Math.floor(contentOffsetX / pageWidth);
    setCurrentPageIndex(index);
  };
  const page = currentPageIndex >= 0 ? (currentPageIndex + 1) : 1
  const length = data.length
  return (
    <Modal visible={visible}>
      <LayoutApp style={{ backgroundColor: '#000' }} styleBot={{ backgroundColor: '#000' }} forceInsetBot={{ bottom: 'always' }}>
        <Block styleBox={[styles.header, styleHeader]}>
          <Touch onPress={_onClose} styleBox={[styles.containerIcon, styleIcon?.container]}>
            <IconC name="close" color='#fff' size={23} style={styleIcon?.icon} />
          </Touch>
          {isValidElement(renderHeader) && renderHeader()}
        </Block>
        <ScrollView
          scrollEventThrottle={16}
          ref={scrollViewRef}
          onScroll={handleScroll}
          onMomentumScrollEnd={handleMomentumScrollEnd}
          style={[styles.scrollView, styleScrollView]} pagingEnabled horizontal showsHorizontalScrollIndicator={false} {...propsScrollView}>
          {arrayData(data).map((source, key) => (
            <Touch disabled key={key} onPress={() => onPressItem && onPressItem(source)} styleBox={[styles.container, styleContainer]}{...propsContainer}>
              <Image source={source} style={[styles.image, styleImage]} />
            </Touch>
          ))}
        </ScrollView>
        <Block h={20} mid>
          <Text style={{ color: '#fff' }}>{page}/{length}</Text>
        </Block>
      </LayoutApp>
    </Modal>
  )
})


const styles = StyleSheet.create({
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
