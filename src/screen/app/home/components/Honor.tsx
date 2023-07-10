import * as React from 'react';
import moment from 'moment';
import FastImage from 'react-native-fast-image';
import {Image, ScrollView, Dimensions} from 'react-native';

import {AppColor} from '@lib/utils';
import {AppLang} from '@assets/langs';
import {Block, TextApp, Touch, IconApp} from '@lib/components';

const WIDTH = Dimensions.get('screen').width;

const Honor = (props: any, ref: any) => {
  return (
    <Block marT10>
      <Block h={150} _background="white">
        <Block flex1 _background={AppColor.primary} />
        <Block flex1 _background={AppColor.white} />
      </Block>
      <Block zIndex={1} style={{position: 'absolute'}} pad10 row>
        <TextApp upper color="white" bold size={16}>
          {AppLang('vinh_danh')}
        </TextApp>
      </Block>
    </Block>
  );
};

export default React.forwardRef(Honor);
