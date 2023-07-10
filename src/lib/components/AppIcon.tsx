import React from 'react'
import {
  FlexStyle,
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  ViewProps,
  ViewStyle,
} from 'react-native'
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
import { IconProps } from 'react-native-vector-icons/Icon'
const RNVectorIcon = {
  Ionicons,
  AntDesign,
  Entypo,
  EvilIcons,
  MaterialIcons,
  MaterialCommunityIcons,
  FontAwesome,
  FontAwesome5,
  SimpleLineIcons,
  Feather,
  Octicons,
}
interface Props {
  name: string
  size?: number
  color?: string
  type?: keyof typeof RNVectorIcon
  onPress?: () => void
  styleContainer?: StyleProp<ViewStyle>
  style?: StyleProp<ViewStyle>
  alignSelf?: FlexStyle['alignSelf']
  disabled?: boolean
  activeOpacity?: number
}
export default class IconC extends React.PureComponent<Props> {
  static defaultProps: Props = {
    size: 23,
    color: 'black',
    name: 'home',
  }
  render() {
    const IconView = RNVectorIcon[this.props.type || 'Ionicons']
    return (
      <TouchableOpacity
        activeOpacity={this.props.activeOpacity || 0.5}
        disabled={typeof this.props.onPress == "function" ? this.props.disabled : true}
        style={[
          styles.container,
          { ...(this.props.alignSelf && { alignSelf: this.props.alignSelf }) },
          this.props.styleContainer,
        ]}>
        <IconView
          size={this.props.size}
          color={this.props.color}
          name={this.props.name}
          onPress={this.props.onPress}
          style={[this.props.style]}
        />
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-start',
  },
})
const defaultProps = {
  size: 23,
  color: 'black',
  name: 'home',
}

export enum NameIcon {
  home = "home",
  filter = "funnel-outline",
  search = "search-outline"
}