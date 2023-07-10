import {
  StyleSheet,
  Text,
  Dimensions,
  TouchableOpacity,
  StyleProp,
  TextStyle,
  ViewStyle,
} from 'react-native'
import React from 'react'
import {AppColor} from '@assets/colors'
import {IconC} from '@mylib'
type T_ButtonIcon = {
  title?: string
  onPress?: () => void
  icon?: string
  styleText?: StyleProp<TextStyle>
  styleButton?: StyleProp<ViewStyle>
  propsButton?: any
  propsText?: any
  sizeIcon?: number
  optionIcon?: any
  left?: boolean
  colorIcon?: string
}
export default function ButtonIcon ({
  title = 'title',
  onPress,
  styleText,
  icon,
  optionIcon,
  sizeIcon,
  colorIcon,
  styleButton,
  left,
  propsButton,
  propsText,
  ...rest
}: T_ButtonIcon) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.button, styleButton, {...propsButton}, {...rest}]}
      activeOpacity={0.7}>
      {left && (
        <IconC
          name={icon ? icon : 'home'}
          size={sizeIcon ? sizeIcon : 25}
          color={colorIcon ? colorIcon : '#fff'}
          {...optionIcon}
        />
      )}
      <Text style={[styles.text, styleText]} {...propsText}>
        {title}
      </Text>
      {!left && (
        <IconC
          name={icon ? icon : 'home'}
          size={sizeIcon ? sizeIcon : 25}
          color={colorIcon ? colorIcon : '#fff'}
          {...optionIcon}
        />
      )}
    </TouchableOpacity>
  )
}
ButtonIcon.defaultProps = {
  left: true,
}
const styles = StyleSheet.create({
  button: {
    height: 50,
    borderRadius: 5,
    backgroundColor: AppColor('primary'),
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  text: {
    marginLeft: 5,
    fontSize: 20,
    fontWeight: '400',
    color: '#fff',
  },
})
