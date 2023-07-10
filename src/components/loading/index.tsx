import React, { Component, PureComponent } from 'react'
import {
  ModalBaseProps,
  Dimensions,
  Modal,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewProps,
  Text
} from 'react-native'
import Loader2 from './Loader2'
import LoadingSrc from './src_loading'
export type LoadingProp = {

  styleLoading?: ViewProps['style']
  styleContainer?: ViewProps['style']
  propsModal?: ModalBaseProps
}
export type LoadingRef = null | {
  open: (e: boolean) => void
  close: () => void
  _setProgress: (e: any) => any
}
export class LoadingApp extends PureComponent<LoadingProp> {
  static _ref: LoadingRef = null
  state: { visible: boolean, hidden: boolean, progress: number, progressShow: boolean, type: keyof typeof LoadingSrc }
  constructor(props: any) {
    super(props)
    this.state = {
      visible: false,
      hidden: false,
      progress: 0,
      progressShow: false,
      type: 'Loader2'
    }
  }
  static setRef(ref: any) {
    LoadingApp._ref = ref
  }
  static show(hidden = false, type: keyof typeof LoadingSrc = 'Loader2') {
    console.log('show')
    if (LoadingApp._ref) LoadingApp._ref.open(hidden, type)
  }
  static setProgress(progress: number, show = true) {
    if (LoadingApp._ref) LoadingApp._ref._setProgress({ progress: Math.round(progress * 100), progressShow: show })
  }
  static hide() {
    if (LoadingApp._ref) LoadingApp._ref.close()
  }
  /**
   * @param hidden 
   * @param type https://www.npmjs.com/package/react-native-indicators
   */
  open(hidden?: boolean, type: keyof typeof LoadingSrc = 'Loader1') {
    console.log('open')
    this.setState(prev => ({ ...prev, visible: true, hidden, ...(type && { type }) }))
  }
  close() {
    this.setState(prev => ({ ...prev, visible: false, progress: 0, progressShow: false }))
  }
  _setProgress(e: any) { this.setState(prev => ({ ...prev, ...e })) }
  onPressOut() {
    if (this.state.hidden) {
      this.close()
    }
  }
  render() {
    // console.log('this.state', this.state)
    const ViewLoading: any = LoadingSrc[this.state.type] ?? Loader2
    return (
      <Modal
        visible={this.state.visible}
        transparent
        style={{ zIndex: 999999 }}
        {...this.props.propsModal}
      >
        <TouchableOpacity onPress={() => this.onPressOut()} activeOpacity={1} style={[styles.container, this.props.styleContainer]}>
          <View style={[styles.loading, this.props.styleLoading]}>
            {/* <ActivityIndicator size={30} /> */}
            {this.state.progressShow && <Text style={styles.text}>{this.state.progress}{'%'}</Text>}
            <ViewLoading color='#4481EB' {...this.state.type == "DotIndicator" && { size: 10 }} />
          </View>
        </TouchableOpacity>
      </Modal>
    )
  }
}
export const LoadingViewer = () => {
  return (<LoadingApp ref={ref => LoadingApp.setRef(ref)} />)
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
  },
  text: {
    position: 'absolute',
    fontSize: 10,
    color: '#4481EB'
  },
})
