import React from 'react';
import FastImage from 'react-native-fast-image';
import {StatusBar, StyleSheet, Dimensions} from 'react-native';

import {AppColor} from '@lib/utils';
import {openDrawer, navigate} from '@navigation';
import {Block, IconApp, Touch} from '@lib/components';

const height = Dimensions.get('screen').width * 0.5;
const statusBarHeight = StatusBar.currentHeight || 0;

export default function HeaderImage() {
  return (
    <Block _background={AppColor.primary}>
      <StatusBar backgroundColor={'transparent'} translucent />
      <Block marT={statusBarHeight}>
        <FastImage
          style={{
            height: height,
            zIndex: -1,
          }}
          source={{
            uri: 'https://b1861544.smushcdn.com/1861544/wp-content/uploads/2021/08/dat-xanh-mien-bac-duoc-vinh-danh-san-giao-dich-bds-xuat-sac-viet-nam-2020.jpg?lossy=1&strip=1&webp=1',
            priority: FastImage.priority.high,
          }}
          resizeMode={FastImage.resizeMode.cover}
        />
        <Touch style={styles.menuIcon} onPress={openDrawer}>
          <IconApp name="menu" size={23} color="white" />
        </Touch>
        <Touch
          style={styles.notificationIcon}
          onPress={() => navigate('ScreenNotifyApp')}>
          <IconApp name="ios-notifications-outline" size={23} color="white" />
        </Touch>
      </Block>
    </Block>
  );
}

const styles = StyleSheet.create({
  menuIcon: {
    position: 'absolute',
    top: 20,
    left: 20,
    zIndex: 1,
  },
  notificationIcon: {
    position: 'absolute',
    top: 20,
    right: 20,
    zIndex: 1,
  },
});
