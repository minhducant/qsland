import { StyleProp, ViewStyle, StyleSheet } from "react-native";
import { isArray, isEmpty, isObject, isString } from "underscore";
import { PropsTouch } from "./TouchProps";
import { _styleChar } from "./utils";

export const TouchStyle: any = (props: PropsTouch) => {
  const PropsConvert = StyleSheet.flatten([
    props.bg && { backgroundColor: props.bg },
    props.w && { width: props.w },
    props.minW && { minWidth: props.minW },
    props.maxW && { maxWidth: props.maxW },
    props.h && { height: props.h },
    props.minH && { minHeight: props.minH },
    props.maxH && { maxHeight: props.maxH },
    props.pad && { padding: props.pad },
    props.padH && { paddingHorizontal: props.padH },
    props.padV && { paddingVertical: props.padV },
    props.padL && { paddingLeft: props.padL },
    props.padT && { paddingTop: props.padT },
    props.padR && { paddingRight: props.padR },
    props.padB && { paddingBottom: props.padB },
    props.mar && { margin: props.mar },
    props.marH && { marginHorizontal: props.marH },
    props.marV && { marginVertical: props.marV },
    props.marL && { marginLeft: props.marL },
    props.marT && { marginTop: props.marT },
    props.marR && { marginRight: props.marR },
    props.marB && { marginBottom: props.marB },
    props.borderR && { borderRadius: props.borderR },
    props.borderC && { borderColor: props.borderC },
    props.borderW && { borderWidth: props.borderW },
    props.borderLW && { borderLeftWidth: props.borderLW },
    props.borderTW && { borderTopWidth: props.borderTW },
    props.borderRW && { borderRightWidth: props.borderRW },
    props.borderBW && { borderBottomWidth: props.borderBW },
    props.alignItems && { alignItems: props.alignItems },
    props.justifyContent && { justifyContent: props.justifyContent },
    props.borderStyle && { borderStyle: props.borderStyle },
    props.opacity && { opacity: props.opacity },
    props.zIndex && { opacity: props.zIndex },

  ])
  const PropsApp = StyleSheet.flatten([
    props._background && { backgroundColor: props._background },
    props._borderC && { borderColor: props._borderC },
    props._borderW && { borderWidth: Number(props._borderW) },
    props._borderR && { borderRadius: Number(props._borderR) },
    props._borderTopR && { borderTopRadius: Number(props._borderTopR) },
    props._borderBottomR && { borderBottomRadius: Number(props._borderBottomR) },
    //
    props.mid && { alignItems: 'center', justifyContent: 'center' },
    props.row && { flexDirection: 'row' },
    props.width100 && { width: '100%' },
    props.height100 && { height: '100%' },
    props.square && { width: props.square, height: props.square },
    props.borderCircle && { borderRadius: 1000 },
    props.alignCenter && { alignItems: 'center' },
    props.justifyCenter && { justifyContent: 'center' },
    props.justifyBetween && { justifyContent: 'space-between' },
    props.overHidden && { overflow: 'hidden' },
    props.overH && { overflow: 'hidden' },//old
    props.centerBetween && { alignItems: 'center', justifyContent: 'space-between', },
    props.flexOne && { flex: 1 },
    props.flex1 && { flex: 1 },
    //
    props.positionOption && {
      position: 'absolute',
      top: props.positionOption?.top,
      bottom: props.positionOption?.bottom,
      left: props.positionOption?.left,
      right: props.positionOption?.right,
    },
    props.paddingOption && {
      paddingLeft: props.paddingOption?.all || props.paddingOption?.left,
      paddingTop: props.paddingOption?.all || props.paddingOption?.top,
      paddingRight: props.paddingOption?.all || props.paddingOption?.right,
      paddingBottom: props.paddingOption?.all || props.paddingOption?.bottom,
    },
    props.marginOption && {
      marginLeft: props.marginOption?.all || props.marginOption?.left,
      marginTop: props.marginOption?.all || props.marginOption?.top,
      marginRight: props.marginOption?.all || props.marginOption?.right,
      marginBottom: props.marginOption?.all || props.marginOption?.bottom,
    },
    props.borderOption && {
      borderLeftWidth: props.borderOption.left,
      borderTopWidth: props.borderOption.top,
      borderBottomWidth: props.borderOption.bottom,
      borderRightWidth: props.borderOption.right,
      borderColor: props.borderOption.color,
    },
    props.marginFlex && {
      paddingHorizontal: props.marginFlex.horizontal,
      paddingVertical: props.marginFlex.vertical,
    },
    props.paddingFlex && {
      paddingHorizontal: props.paddingFlex.horizontal,
      paddingVertical: props.paddingFlex.vertical,
    },
    !isEmpty(props.shadowOption) && {
      shadowColor: props.shadowOption?.color,
      shadowOffset: {
        width: props.shadowOption?.width,
        height: props.shadowOption?.height,
      },
      shadowOpacity: props.shadowOption?.opacity,
      shadowRadius: props.shadowOption?.radius,
      elevation: props.shadowOption?.elevation,
    },
    !isEmpty(props.shadow) && {
      shadowColor: isObject(props.shadow) && props.shadow?.color || '#000',
      shadowOffset: { width: 2, height: 2, },
      shadowOpacity: 1,
      shadowRadius: 10,
      elevation: 2,
    },
    props.pad5 && { padding: 5 }, props.pad10 && { padding: 10 },
    props.pad20 && { padding: 20 }, props.padV5 && { paddingVertical: 5 },
    props.padV10 && { paddingVertical: 10 }, props.padV20 && { paddingVertical: 20 },
    props.padH5 && { paddingHorizontal: 5 }, props.padH10 && { paddingHorizontal: 10 },
    props.padH20 && { paddingHorizontal: 20 }, props.padL10 && { paddingLeft: 10 },
    props.padT10 && { paddingTop: 10 }, props.padR10 && { paddingRight: 10 },
    props.padB10 && { paddingBottom: 10 }, props.mar5 && { margin: 5 },
    props.mar10 && { margin: 10 }, props.mar20 && { margin: 20 },
    props.marH5 && { marginHorizontal: 5 }, props.marH10 && { marginHorizontal: 10 },
    props.marH20 && { marginHorizontal: 20 }, props.marV5 && { marginVertical: 5 },
    props.marV10 && { marginVertical: 10 }, props.marV20 && { marginVertical: 20 },
    props.marL10 && { marginLeft: 10 }, props.marT10 && { marginTop: 10 },
    props.marR10 && { marginRight: 10 },
    props.marB5 && { marginBottom: 5 }, props.marB10 && { marginBottom: 10 }, props.marB20 && { marginBottom: 20 },
    props.flex1 && { flex: 1 }, props.flex2 && { flex: 2 }, props.flex3 && { flex: 3 },
    props.flex4 && { flex: 4 }, props.flex5 && { flex: 5 }, props.flex6 && { flex: 6 },
    props.flex7 && { flex: 7 }, props.flex8 && { flex: 8 }, props.flex9 && { flex: 9 },
    props.borderR2 && { borderRadius: 2 }, props.borderR5 && { borderRadius: 5 },
    props.borderR10 && { borderRadius: 10 }, props.borderR15 && { borderRadius: 15 }, props.borderR20 && { borderRadius: 20 },
    props.borderW1 && { borderWidth: 1 }, props.borderW2 && { borderWidth: 2 },
    props.borderW3 && { borderWidth: 3 }, props.borderW4 && { borderWidth: 4 }, props.borderW5 && { borderWidth: 5 },    ///
    props.background && {
      backgroundColor: isString(props.background) ? props.background
        : isArray(props.background) && props.background.length == 1 ? props.background[0] : undefined
    },
    props.styleChar && { ..._styleChar(props.styleChar) }
  ])
  return [
    PropsApp,
    PropsConvert,
  ]
}
