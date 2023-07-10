import React, {
  MutableRefObject,
  useEffect,
  useRef,
  useState,
  forwardRef,
  useImperativeHandle,
} from 'react'
import {
  Dimensions,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from 'react-native'
import Video from 'react-native-video'
import OptionVideo from './OptionVideo'
import { isEmpty } from 'underscore'
import { Log } from '@utils'
import { IconC, ViewC } from '@mylib'
import { useSelector } from 'react-redux'
import store from '@service/store'
import { setPauseVideo, setStateVideo } from '@service/store/slice/configSlice'

//=======================================================//
const VideoIOS = forwardRef((props: any, ref: any) => {
  useImperativeHandle(ref, () => ({
    pauseVideo() {
      pauseVideo()
    },
    playVideo() {
      playVideo()
    },
  }))
  const [_paused, set_paused] = useState(true)
  const [loading, setLoading] = useState(true)
  const lengthTime: MutableRefObject<any> = useRef(-1)
  const seek: MutableRefObject<any> = useRef(0)
  const keyOL: MutableRefObject<any> = useRef(false)
  const keyP: MutableRefObject<any> = useRef(false)
  const player: MutableRefObject<any> = useRef<any>()
  const refOptionVideo: MutableRefObject<any> = useRef()

  const pauseVideo = () => {
    if (_paused) return
    // Log.e('', 'pause:', props.index)
    keyP.current = false

    set_paused(true)
  }
  const playVideo = async () => {
    // Log.e('', 'play:', props.index)
    keyP.current = true
    if (keyOL) {
      await player.current.seek(seek)
      set_paused(false)
    }
  }
  const _onLoad = async (data: any) => {
    // Log.d('', '******return load:', props.index)
    keyOL.current = true

    await setLoading(false)
    if (keyP.current) {
      await player.current.seek(seek)

      await set_paused(false)
    }
    if (lengthTime.current === -1) {
      refOptionVideo.current.setLength(data.duration)
      lengthTime.current = data.duration
    }
  }
  const _onLoadStart = () => { }

  const _onChangePlay = () => {
    keyP.current = true
    if (keyOL.current && keyP.current && !loading) {
      set_paused(prev => !prev)
    }
    store.dispatch(setStateVideo(false))
  }
  //******************************************** */
  const _onProgress = (data: any) => {
    // Log.d('_onProgress', {IOS: 'IOS'})
    if (!_paused) {
      seek.current = data.currentTime
      refOptionVideo.current.setPoint(data.currentTime)
    }
  }
  const _onEnd = async () => {
    Log.d('', 'onEnd')
    seek.current = 0

    await set_paused(true)
    player.current.seek(0)
    refOptionVideo.current.setPoint(0)
  }
  const _onSlidingComplete = (t: any) => {
    // Log.d('t:', t)
    seek.current = t
    refOptionVideo.current.setPoint(t)
    player.current.seek(t)
    set_paused(false)
  }
  const _onSlidingStart = () => {
    set_paused(true)
  }
  useEffect(() => {
    if (props.index === 0) {
      keyOL.current = true
    }
  }, [])
  const getSizePlay = (height: number) => {
    if (height * 0.2 > 23) return 50
    return height * 0.2
  }
  const pauseVideoX = useSelector((state: any) => state.config.pauseVideo)
  // Log.d('pauseVideoX:', pauseVideoX)
  useEffect(() => {
    if (pauseVideoX) pauseVideo()
  }, [pauseVideoX])
  if (isEmpty(props.source)) return <ViewC width={width} height={300} />
  return (
    <TouchableOpacity
      style={{ backgroundColor: props.background, alignItems: 'center' }}
      activeOpacity={1}
      onPress={_onChangePlay}>
      <Video
        ref={player}
        paused={_paused}
        source={props.source}
        // repeat={props.repeat}
        repeat={false}
        onProgress={_onProgress}
        onEnd={_onEnd}
        onLoad={_onLoad}
        onLoadStart={_onLoadStart}
        style={{ width: props.width, height: props.height }}
        resizeMode='contain'
        volume={1}
        rate={1.0}
        muted={false}
        // shouldPlay={true}
        ignoreSilentSwitch='ignore'
      />
      {loading && (
        <View style={{ position: 'absolute', top: props.height / 2 - 10 }}>
          <ActivityIndicator size={props.height * 0.2} color='#fff' />
        </View>
      )}
      {_paused && !loading && (
        <View style={{ position: 'absolute', top: props.height / 2 - 10 }}>
          <IconC name='play' color='#fff' size={getSizePlay(props.height)} />
        </View>
      )}
      <OptionVideo
        ref={refOptionVideo}
        onSlidingComplete={_onSlidingComplete}
        onSlidingStart={_onSlidingStart}
        onPressButton={_onChangePlay}
        paused={_paused}
        width={props.width}
        height={props.height}
      />
    </TouchableOpacity>
  )
})
export default VideoIOS
const { width } = Dimensions.get('window')

VideoIOS.defaultProps = {
  source: null,
  width: width,
  height: 300,
  background: '#000',
  widthSlider: 380,
}
