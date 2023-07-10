import React, {
  createRef,
  forwardRef,
  MutableRefObject,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react'
import {
  Dimensions,
  TouchableOpacity,
  Platform,
  View,
  ActivityIndicator,
} from 'react-native'
import Video from 'react-native-video'
import { Log } from '@utils'
import PropsTypes from 'prop-types'
import OptionVideo from './OptionVideo'
import { isEmpty } from 'underscore'
import { ViewC, IconC } from '@mylib'
import { useSelector } from 'react-redux'
import store from '@service/store'
import { setPauseVideo, setStateVideo } from '@service/store/slice/configSlice'
//=======================================================//

const VideoPlayer = forwardRef((props: any, ref) => {
  const [_paused, set_paused] = useState(props?.autoplay ? false : true)
  const [loading, setLoading] = useState(true)
  const lengthTime: MutableRefObject<any> = useRef(-1)
  const seek: MutableRefObject<any> = useRef(0)
  const keyOL: MutableRefObject<any> = useRef(false)
  const keyP: MutableRefObject<any> = useRef(false)
  const keyV: MutableRefObject<any> = useRef(false)
  const player: MutableRefObject<any> = useRef<any>()
  const refOptionVideo: MutableRefObject<any> = useRef()
  useImperativeHandle(ref, () => ({
    pauseVideo() {
      pauseVideo()
    },
  }))
  const pauseVideo = () => {
    if (_paused) return
    keyP.current = false
    keyOL.current = false
    keyV.current = false
    set_paused(true)
    // setLoading(true)
  }
  const playVideo = () => {
    keyP.current = true
    _onReadyPause()
  }
  const _onLoad = async (data: any) => {
    player.current.seek(seek.current)
    keyOL.current = true

    await setLoading(false)
    await _onReadyPause()
    //
    if (lengthTime.current === -1 && props.showOption) {
      refOptionVideo.current.setLength(data.duration)
      lengthTime.current = data.duration
    }
  }
  const _onLoadStart = async () => {
    setLoading(true)
  }
  const _onReadyPause = () => {
    if (keyOL.current && keyP.current && !loading) {
      keyV.current = true
      set_paused(false)
    }
  }
  const _onChangePlay = async () => {
    keyP.current = true
    keyOL.current = true
    keyV.current = true
    await store.dispatch(setStateVideo(false))
    if (keyOL.current && keyP.current && !loading && keyV.current) {
      await set_paused(prev => !prev)
    }
  }
  const _onProgress = (data: any) => {
    if (!_paused) {
      seek.current = data.currentTime
      refOptionVideo.current && refOptionVideo.current.setPoint(data.currentTime)
    }
  }
  const _onEnd = () => {
    seek.current = 0
    set_paused(true)

    player.current.seek(0)
    refOptionVideo.current && refOptionVideo.current.setPoint(0)
  }
  const _onSlidingComplete = (t: any) => {
    seek.current = t
    refOptionVideo.current && refOptionVideo.current.setPoint(t)
    player.current.seek(t)

    set_paused(false)
  }
  const _onSlidingStart = () => {
    !props?.autoplay && set_paused(true)
  }
  useEffect(() => {
    if (props.index === 0) {
      keyOL.current = true
    }
    if (props?.autoplay) setTimeout(() => {
      set_paused(true)
    }, 1500);
  }, [])
  const pauseVideoX = useSelector((state: any) => state.config.pauseVideo)
  // Log.d('pauseVideoX:', pauseVideoX)
  useEffect(() => {
    if (pauseVideoX) pauseVideo()
  }, [pauseVideoX])
  const getSizePlay = (height: number) => {
    if (height * 0.2 > 23) return 50
    return height * 0.2
  }
  if (isEmpty(props.source))
    return <ViewC width={props.width} height={props.height} />
  return (
    <TouchableOpacity
      disabled={props.disabled}
      style={[
        {
          backgroundColor: props.background,
          alignItems: 'center',
          width: props.width,
          height: props.height,
        },
      ]}
      activeOpacity={1}
      onPress={_onChangePlay}>
      <Video
        ref={player}
        paused={_paused}
        source={props.source}
        repeat={props.repeat}
        onProgress={_onProgress}
        onEnd={_onEnd}
        onLoad={_onLoad}
        onLoadStart={_onLoadStart}
        style={{ width: props.width, height: props.height }}
        resizeMode='contain'
      />
      {loading && (
        <View style={{ position: 'absolute', top: props.height / 2 - 10 }}>
          <ActivityIndicator size={props.height * 0.2} color='#fff' />
        </View>
      )}
      {_paused && !loading && !props.disabled && !props.hiddenPlay && (
        <View style={{ position: 'absolute', top: props.height / 2 - 10 }}>
          <IconC name='play' color='#fff' size={getSizePlay(props.height)} />
        </View>
      )}
      {props.showOption && (
        <OptionVideo
          showOption={props.showOption}
          ref={refOptionVideo}
          onSlidingComplete={_onSlidingComplete}
          onSlidingStart={_onSlidingStart}
          onPressButton={_onChangePlay}
          paused={_paused}
          width={props.width}
          height={props.height}
        />
      )}
    </TouchableOpacity>
  )
})
export default VideoPlayer
const { width } = Dimensions.get('window')

VideoPlayer.defaultProps = {
  source: null,
  width: width,
  height: 300,
  background: '#000',
  widthSlider: 380,
  showOption: true,
}
