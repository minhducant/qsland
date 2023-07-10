import React from 'react'
import { StyleProp, ViewStyle } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Entypo from 'react-native-vector-icons/Entypo'
import AntDesign from 'react-native-vector-icons/AntDesign'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import Feather from 'react-native-vector-icons/Feather'
import Octicons from 'react-native-vector-icons/Octicons'
interface IconProps extends ViewStyle {
  name: string
  size?: number | string
  color?: string
  type?:
  | 'AntDesign'
  | 'MaterialIcons'
  | 'MaterialCommunityIcons'
  | 'Ionicons'
  | 'FontAwesome5'
  | 'FontAwesome'
  | 'SimpleLineIcons'
  | 'Feather'
  | 'Octicons'
  | 'Entypo'
  | 'EvilIcons'
  onPress?: Function | undefined
  style?: StyleProp<ViewStyle> | undefined
  colors?: 'black' | 'primary'
}
export default class IconC extends React.PureComponent<IconProps> {
  static Type: any = {
    Ionicons: Ionicons,
    AntDesign: AntDesign,
    Entypo: Entypo,
    EvilIcons: EvilIcons,
    MaterialIcons: MaterialIcons,
    MaterialCommunityIcons: MaterialCommunityIcons,
    FontAwesome: FontAwesome,
    FontAwesome5: FontAwesome5,
    SimpleLineIcons: SimpleLineIcons,
    Feather: Feather,
    Octicons: Octicons,
  }

  render() {
    const styleProps: Array<any> = []

    const IconView = IconC.Type[this.props.type ? this.props.type : 'Ionicons']
    const _color = () => {
      if (this.props.color) return this.props.color
      return this.props?.colors ? COLOR_ICON[this.props?.colors] : 'gray'
    }

    return (
      <IconView
        size={this.props.size}
        color={_color()}
        name={this.props.name}
        onPress={this.props.onPress}
        style={[styleProps, this.props.style]}
      />
    )
  }
}
const COLOR_ICON = {
  black: '#2d2d2d',
  primary: '#4481EB'
}
