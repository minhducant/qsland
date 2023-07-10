import React, {createRef} from 'react'
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native'
import Video, {FilterType} from 'react-native-video'
import {Log} from '@utils'
import Moment from 'moment'
import PropsTypes from 'prop-types'
import Slider from '@react-native-community/slider'
import Ionicons from 'react-native-vector-icons/Ionicons'
export default class VideoPlayer extends React.PureComponent {
  constructor (props) {
    super(props)
    this.refOptionVideo = createRef()
    this.state = {
      _paused: true,
    }
    this.loadding = true
    this.lengthTime = -1
    this.seek = 0
    //******************************************** */
    this.keyOL = false
    this.keyP = false
  }
  playVideo = () => {
    Log.d('', 'playVideo')
    if (!this.keyOL) this.keyP = true
    if (this.keyOL) {
      this.setState({
        _paused: false,
      })
      this.keyP = true
    }
  }
  pauseVideo = () => {
    Log.d('', 'pauseVideo')
    //this.play.current = false
    this.setState({
      _paused: true,
    })
    this.keyOL = false
    this.keyP = false
  }

  //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  handleSaveSeek = data => {
    //Log.d('P', 'onProgess', { index: this.props.index })
    if (!this.state.paused) {
      this.seek = data.currentTime
      this.refOptionVideo.current.setPoint(data.currentTime)
    }
  }
  //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  handleOnEnd = () => {
    this.seek = 0
    this.setState({
      _paused: true,
    })
    this.player.seek(this.seek)
    this.refOptionVideo.current.setPoint(0)
  }
  //******************************************** */
  handleOnLoadStart = r => {
    // Log.d('OnLoadStart', {
    //   index: this.props.index,
    // })
  }
  //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  handleSetSeekVideo = data => {
    Log.d('', 'return load,index', this.props.index)
    if (!this.keyP) {
      this.player.seek(this.seek)
      this.keyOL = true
    }
    if (this.keyP) {
      //case pho bien
      this.player.seek(this.seek)
      this.setState({
        _paused: false,
      })
      this.keyOL = true
    }
    if (this.lengthTime === -1) {
      this.refOptionVideo.current.setLengthTime(data.duration)
      this.lengthTime = data.duration
    }
  }

  //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  _onSlidingComplete = t => {
    this.seek = t
    this.refOptionVideo.current.setPoint(t)
    this.player.seek(this.seek)
    this.setState({
      _paused: false,
    })
  }
  _onSlidingStart = t => {
    this.setState({
      _paused: true,
    })
  }

  componentDidMount () {
    if (this.props.index === 0) this.playVideo()
  }
  render () {
    Log.d('R', 'render_video')
    const {...rest} = this.props
    return (
      <View
        style={[
          {
            backgroundColor: this.props.background,
            alignItems: 'center',
          },
        ]}>
        {this.props.source && (
          <Video
            ref={player => {
              this.player = player
            }}
            paused={this.state._paused}
            source={this.props.source}
            repeat={this.props.repeat}
            onProgress={this.handleSaveSeek}
            onEnd={this.handleOnEnd}
            onLoad={this.handleSetSeekVideo}
            onReadyForDisplay={r => {
              //Log.d('::ready:fordisplay', r)
              //this.player.seek(this.seek)
              // this.handleSetSeekVideo()
            }}
            onLoadStart={this.handleOnLoadStart}
            //style={{ width: 300, height: 300 }}
            style={{width: this.props.width, height: this.props.height}}
            resizeMode='stretch'
          />
        )}
        {!this.props.source && <View style={{width: width, height: 300}} />}
        {this.state._paused && (
          <View style={{position: 'absolute', top: 120}}>
            <ActivityIndicator size={40} />
          </View>
        )}
        <OptionVideo
          ref={this.refOptionVideo}
          onSlidingComplete={this._onSlidingComplete}
          onSlidingStart={this._onSlidingStart}
          onPressButton={() => {
            this.setState({_paused: !this.state._paused})
          }}
          paused={this.state._paused}
        />
      </View>
    )
  }
}
const {width} = Dimensions.get('window')
VideoPlayer.propsTypes = {
  source: PropsTypes.object,
  width: PropsTypes.number,
  height: PropsTypes.number,
}
VideoPlayer.defaultProps = {
  source: null,
  width: width,
  height: 300,
  background: '#000',
  widthSlider: 380,
}

class OptionVideo extends React.Component {
  state = {
    _poit: 0,
    lengthTime: -1,
  }
  constructor (props) {
    super(props)
  }
  setPoint = p => {
    this.setState({
      _poit: p,
    })
  }
  setLengthTime = l => {
    this.setState({
      lengthTime: l,
    })
  }
  render () {
    return (
      <View
        style={[
          styles.optionVideo,
          {
            backgroundColor: this.props.background,
            width: this.props.widthSlider,
          },
        ]}>
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={this.props.onPressButton}>
          <Ionicons
            name={this.props.paused ? 'play' : 'pause'}
            size={20}
            color='#fff'
          />
        </TouchableOpacity>
        <RenderTime point={this.state._poit} type='left' />
        <Slider
          style={{width: 280, height: 40}}
          value={this.state._poit}
          minimumValue={0}
          maximumValue={
            this.state.lengthTime === -1 ? 1 : this.state.lengthTime
          }
          minimumTrackTintColor='#F70000'
          maximumTrackTintColor='#FFFFFF'
          thumbTintColor='#FF0000'
          onSlidingComplete={this.props.onSlidingComplete}
          onSlidingStart={this.props.onSlidingStart}
        />
        <RenderTime
          point={this.state._poit}
          type='right'
          length={this.state.lengthTime}
        />
      </View>
    )
  }
}
OptionVideo.defaultProps = {
  background: '#000',
  widthSlider: width - 10,
}
const RenderTime = ({point, type, length}) => {
  if (type === 'left')
    return (
      <Text style={{color: '#fff'}}>
        {Moment()
          .startOf('day')
          .seconds(parseFloat(point).toFixed(0))
          .format('mm:ss')}
      </Text>
    )
  if (type === 'right')
    return (
      <Text style={{color: '#fff'}}>
        {'-'}
        {length === -1
          ? '00:00'
          : Moment()
              .startOf('day')
              .seconds(parseFloat(length - point).toFixed(0))
              .format('mm:ss')}
      </Text>
    )
}
const styles = StyleSheet.create({
  optionVideo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 5,
  },
})
