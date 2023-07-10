import React, { Component, PureComponent } from 'react'
import {
  ActivityIndicator,
  ModalBaseProps,
  Dimensions,
  Modal,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewProps
} from 'react-native'
export type LoadingProp = {
  styleLoading?: ViewProps['style']
  styleContainer?: ViewProps['style']
  propsModal?: ModalBaseProps
}
export type LoadingRef = null | {
  open: (e: boolean) => void
  close: () => void
}
export default class Loading extends PureComponent<LoadingProp> {
  static _ref: LoadingRef = null
  state: { visible: boolean, hidden: boolean }
  constructor(props: any) {
    super(props)
    this.state = {
      visible: false,
      hidden: false
    }
  }
  static setRef(ref: any) {
    Loading._ref = ref
  }
  /*/**##  hidden out: */
  static show(hidden?: boolean) {
    if (Loading._ref) Loading._ref.open(hidden)
  }

  static hide() {
    if (Loading._ref) Loading._ref.close()
  }

  open(hidden?: boolean) {
    this.setState(prev => ({ ...prev, visible: true, hidden }))
  }
  close() {
    this.setState(prev => ({ ...prev, visible: false }))
  }
  onPressOut() {
    if (this.state.hidden) {
      this.close()
    }
  }
  render() {
    return (
      <Modal
        visible={this.state.visible}
        transparent
        {...this.props.propsModal}
      >
        <TouchableOpacity onPress={() => this.onPressOut()} activeOpacity={1} style={[styles.container, this.props.styleContainer]}>
          <View style={[styles.loading, this.props.styleLoading]}>
            <ActivityIndicator size={30} />
          </View>
        </TouchableOpacity>
      </Modal>
    )
  }
}
export const LoadingViewer = () => {
  return (<Loading ref={ref => Loading.setRef(ref)} />)
}
/**
 * 
 * 
 * 
 * 
 * 
 * 
 */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9E9E9E1C',
  },
  loading: {
    width: Dimensions.get('screen').width * 0.25,
    height: Dimensions.get('screen').width * 0.25,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
    shadowColor: '#000',
    elevation: 3,
    shadowOffset: {
      width: 3,
      height: 5,
    },
    shadowOpacity: 0.1,
  }
})
