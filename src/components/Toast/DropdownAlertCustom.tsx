import { AppImage } from '@assets'
import { DropDownHolder, DropDownHolderNotify } from './index'
import React from 'react'
import DropdownAlert from 'react-native-dropdownalert'
const time_drop = 1500
export default function DropdownAlertCustom() {
  return (
    <DropdownAlert
      ref={ref => DropDownHolder.setDropDown(ref)}
      inactiveStatusBarBackgroundColor={'green'}
      updateStatusBar={false}
      errorColor={'#B57F00'}
      successColor={'#238209'}
      errorImageSrc={AppImage('logo_bg1')}
      successImageSrc={AppImage('logo_bg1')}
      imageStyle={{
        padding: 8,
        width: 36,
        height: 36,
        alignSelf: 'center',
        borderRadius: 23,
      }}
      elevation={40}
      containerStyle={{ backgroundColor: 'pink' }}
      closeInterval={time_drop}
      showCancel={false}
    />
  )
}
export function DropdownNotify() {
  return (
    <DropdownAlert
      ref={ref => DropDownHolderNotify.setDropDown(ref)}
      inactiveStatusBarBackgroundColor={'green'}
      updateStatusBar={false}
      errorColor={'#B57F00'}
      successColor={'#238209'}
      errorImageSrc={AppImage('logo_bg1')}
      successImageSrc={AppImage('logo_bg1')}
      imageStyle={{
        padding: 8,
        width: 36,
        height: 36,
        alignSelf: 'center',
        borderRadius: 23,
      }}
      elevation={40}
      containerStyle={{ backgroundColor: 'pink', paddingTop: 20 }}
      closeInterval={10000}
      showCancel
      onTap={({ payload }) => {
        if (typeof payload?.onPress == "function") payload.onPress()
        console.log('onTap', payload)
      }}
    />
  )
}
