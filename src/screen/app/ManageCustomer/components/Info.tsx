import React from 'react';
import { Block, TextApp, IconApp, AppStyle, } from '@lib/components';
import { AppLang } from '@assets/langs';
import { isString } from 'underscore';
export const Info = ({ value, icon, label, color, textStyle, }: {
  textStyle?: any;
  value: any;
  icon?: any;
  label?: string;
  color?: string;
}) => {
  return (
    <Block row alignCenter marT={2}>
      {isString(icon) && <IconApp name={icon} size={18} />}
      {isString(label) && <TextApp style={[AppStyle.content]}>{label}</TextApp>}
      <TextApp
        style={[AppStyle.content, { marginLeft: 5, color: color }, textStyle]}>
        {value || AppLang('dang_cap_nhat')}
      </TextApp>
    </Block>
  );
}; 
