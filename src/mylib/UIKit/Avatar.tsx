import React from 'react'
import {
  ImageStyle, Image, ViewStyle, StyleProp,
  Text, TouchableOpacityProps, TouchableOpacity,
  TouchableWithoutFeedbackProps,
  ImagePropsBase,
  ImageBase
} from 'react-native'
import { isArray, isEmpty, isFunction, isObject, isString } from 'underscore'


interface Props {
  source?: ImagePropsBase['source']
  radius?: number
  style?: StyleProp<ImageStyle>
  styleImage?: StyleProp<ImageStyle>
  name?: string
  styleBox?: StyleProp<ViewStyle>
  activeOpacity?: TouchableOpacityProps['activeOpacity']
  onPress?: TouchableWithoutFeedbackProps['onPress']
  onLongPress?: TouchableWithoutFeedbackProps['onLongPress']
  fontSize?: number
}
const AvatarC = ({
  source,
  radius = 50,
  name,
  styleImage,
  styleBox,
  fontSize,
  activeOpacity, onPress, onLongPress
}: Props) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      onLongPress={onLongPress}
      activeOpacity={activeOpacity || 0.8}
      style={[
        {
          width: radius * 2,
          height: radius * 2,
          borderRadius: radius,
          overflow: 'hidden',
          backgroundColor: _background(name),
          justifyContent: 'center',
          alignItems: 'center',
        },
        styleBox,
      ]}
    >
      {isSource(source) && source && (
        <Image
          source={source}
          style={[
            {
              width: radius * 2,
              height: radius * 2,
              borderRadius: radius,
              overflow: 'hidden',
            },
            styleImage,
          ]}
          resizeMode={'cover'}
        />
      )}
      {!isSource(source) && (
        <Text style={{ color: '#fff', fontSize: fontSize ?? radius * 0.8 }}>
          {firstName(name)}
        </Text>
      )}
    </TouchableOpacity>
  )
}
export default AvatarC
const isSource = (source: any) => {
  if (isFunction(source) || isArray(source)) return false
  if (source === '' || source === null || source === undefined || source === false || Object.keys(source).length == 0) return false
  if (isObject(source)) {
    let { uri } = source
    if (uri === '' || uri === null || uri === undefined || uri === false || Object.keys(uri).length == 0) return false
  }
  return true
}
const firstName = (name: any, defaultKey = 'A') => {
  if (isEmpty(name) || !isString(name)) return defaultKey
  let clear_space = name.split(/\s+/).join(' ').trim()
  let step_name = clear_space.split(' ')
  let lastName = step_name[step_name.length - 1]
  const clearVN = clearVietNamese(lastName)
  return `${clearVN[0]}`.toUpperCase()
}
const firstNameColor = (key: string) => {
  let color = Color[key]
  if (!color) return 'gray'
  return color
}
const _background = (name: any) => {
  return firstNameColor(firstName(name))
}
function clearVietNamese(str: string) {
  var AccentsMap = [
    'aàảãáạăằẳẵắặâầẩẫấậ',
    'AÀẢÃÁẠĂẰẲẴẮẶÂẦẨẪẤẬ',
    'dđ',
    'DĐ',
    'eèẻẽéẹêềểễếệ',
    'EÈẺẼÉẸÊỀỂỄẾỆ',
    'iìỉĩíị',
    'IÌỈĨÍỊ',
    'oòỏõóọôồổỗốộơờởỡớợ',
    'OÒỎÕÓỌÔỒỔỖỐỘƠỜỞỠỚỢ',
    'uùủũúụưừửữứự',
    'UÙỦŨÚỤƯỪỬỮỨỰ',
    'yỳỷỹýỵ',
    'YỲỶỸÝỴ',
  ]
  for (var i = 0; i < AccentsMap.length; i++) {
    var re = new RegExp('[' + AccentsMap[i].substr(1) + ']', 'g')
    var char = AccentsMap[i][0]
    str = str.replace(re, char)
  }
  return str
}
const ArrColor = [
  `#1A7A7E`, `#2B6BE2`, `#a52a2a`, `#deb887`, `#0000ff`, `#7fff00`, `#d2691e`,
  `#ff7f50`, `#6495ed`, `#00ffff`, `#008b8b`, `#b8860b`, `#006400`, `#51A977`,
  `#bdb76b`, `#8b008b`, `#85B03A`, `#ff8c00`, `#9932cc`, `#e9967a`, `#8fbc8f`,
  `#338E8E`, `#00ced1`, `#9400d3`, `#ff1493`, `#058AB7`,
]
const Color = Object.fromEntries(ArrColor.map((color, index) => [String.fromCharCode(index + 65), color]))