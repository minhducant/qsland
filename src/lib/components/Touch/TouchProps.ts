import { StyleProp, FlexStyle, TouchableWithoutFeedbackProps, ViewStyle } from "react-native"

export interface PropsConvert {
  bg?: string
  w?: FlexStyle['width']
  h?: FlexStyle['height']
  pad?: number
  padH?: number
  padV?: number
  padL?: number
  padT?: number
  padR?: number
  padB?: number
  flex?: number
  mar?: number
  marH?: number
  marV?: number
  marL?: number
  marT?: number
  marR?: number
  marB?: number
  minW?: number
  maxW?: number
  minH?: number
  maxH?: number
  borderR?: number
  borderC?: string
  borderW?: number
  borderLW?: number
  borderTW?: number
  borderRW?: number
  borderBW?: number
  alignItems?: FlexStyle['alignItems']
  alignSelf?: FlexStyle['alignSelf']
  justifyContent?: FlexStyle['justifyContent']
  borderStyle?: ViewStyle['borderStyle']
  opacity?: ViewStyle['opacity']
  zIndex?: ViewStyle['opacity']
}
type _size = '0' | '5' | '10' | '15' | '20' | '30' | '40' | '50' | '100'
type _color = '#ddd' | '#fff' | '#eee' | '#000' | 'white' | 'blue' | 'green' | 'pink' | 'yellow'
type _border = "0.3" | "0.5" | "0.8" | "1" | "2" | "3" | "5"
type _background = "white" | 'black' | 'blue'
export interface PropsApp {
  /** Switch to using prop background*/
  _background?: string
  _borderC?: _color
  _borderW?: _border
  _borderR?: _size
  _borderTopR?: _size
  _borderBottomR?: _size
  //
  mid?: boolean
  row?: boolean
  alignCenter?: boolean
  justifyCenter?: boolean
  borderCircle?: boolean
  centerBetween?: boolean
  justifyBetween?: boolean
  overHidden?: boolean
  overH?: boolean//old
  square?: number
  width100?: boolean
  height100?: boolean


  //
  /** =>>>background.length>1 ~ LinearGradient*/
  background?: Array<_background> | Array<(string)> | string
  /** Gradient gradient direction ~ background.length>1 ~ */
  gradient?: 'vertical' | 'horizontal'
  /** =>>>Switch to using prop flex1*/
  flexOne?: boolean
  /** =>>>Switch to using prop flex1*/
  shadow?: { color?: string } | boolean
  borderOption?: { top?: number, left?: number, right?: number, bottom?: number, color?: string }
  positionOption?: { top?: number, left?: number, right?: number, bottom?: number }
  paddingOption?: { all?: number, top?: number, left?: number, right?: number, bottom?: number }
  paddingFlex?: { vertical?: number, horizontal?: number }
  marginFlex?: { vertical?: number, horizontal?: number }
  marginOption?: { all?: number, top?: number, left?: number, right?: number, bottom?: number }
  shadowOption?: { color?: string, width?: number, height?: number, opacity?: number, radius?: number, elevation?: number }
  //
  pad5?: boolean; pad10?: boolean; pad20?: boolean; padV5?: boolean; padV10?: boolean;
  padV20?: boolean; padH5?: boolean; padH10?: boolean; padH20?: boolean; padL10?: boolean;
  padT10?: boolean; padR10?: boolean; padB10?: boolean; mar5?: boolean; mar10?: boolean;
  mar20?: boolean; marH5?: boolean; marH10?: boolean; marH20?: boolean; marV5?: boolean;
  marV10?: boolean; marV20?: boolean; marL10?: boolean; marT10?: boolean; marR10?: boolean;
  marB5?: boolean; marB10?: boolean; marB20?: boolean;
  flex1?: boolean; flex2?: boolean; flex3?: boolean; flex4?: boolean;
  flex5?: boolean; flex6?: boolean; flex7?: boolean; flex8?: boolean; flex9?: boolean;
  //
  borderR2?: boolean; borderR5?: boolean; borderR10?: boolean; borderR15?: boolean; borderR20?: boolean;
  borderW1?: boolean; borderW2?: boolean; borderW3?: boolean; borderW4?: boolean; borderW5?: boolean;
  /**'padding30;marginTop6;borderRadius11;' */
  styleChar?: string
}
export interface PropsTouch extends TouchableWithoutFeedbackProps, PropsConvert, PropsApp {
  children?: React.ReactNode
  styleBox?: StyleProp<ViewStyle>
  hidden?: boolean
  activeOpacity?: number
}
/**
 * backfaceVisibility:route hidden
 */
