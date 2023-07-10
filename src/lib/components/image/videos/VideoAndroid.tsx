import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react'
import {
  Dimensions,
  TouchableOpacity,
  View,
  ActivityIndicator,
  StyleSheet,
  ViewProps,
} from 'react-native'
import Video from 'react-native-video'
import { Log, screen_width } from '../dependencies';
import { Menu, MenuVideoRef } from './menu/Menu'
import { isEmpty } from 'underscore'
import { IconC } from '@mylib'
import { Live, LiveRef } from './menu'

export type VideoAndroidProps = {
  index?: number
  source?: any,
  width?: number,
  height?: number
  hiddenMenu?: boolean
  disableContainer?: boolean
  repeat?: boolean
  styleContainer?: ViewProps['style']
  styleVideo?: ViewProps['style']
  styleLoading?: { color?: string }
  autoPause?: number
  isLive?: boolean
  timeStart?: string

}
export type VideoAndroidRef = {
  pause?: () => any
  play?: () => any
}
export const VideoAndroid = forwardRef<VideoAndroidRef, VideoAndroidProps>(({
  styleContainer,
  styleVideo,
  styleLoading,
  height,
  width,
  hiddenMenu,
  disableContainer,
  index,
  autoPause,
  repeat,
  isLive,
  timeStart,
  ...props
}, ref) => {
  const [paused, setPaused] = useState(true)
  const [loading, setLoading] = useState(true)
  const lengthTime = useRef<number>(-1)
  const seek = useRef<number>(0)
  const keyOL = useRef<boolean>(false)
  const keyP = useRef<boolean>(false)
  const keyV = useRef(false)
  const refVideo = useRef<React.ComponentPropsWithRef<typeof Video>>()
  const refLive = useRef<LiveRef>()
  const refMenuVideo = useRef<MenuVideoRef>({})
  useImperativeHandle(ref, () => ({
    pause() {
      onPause()
    },
    play() {
      onPlay()
    },
    playSeek(seek: number) { onPlaySeek(seek) },
    getSeek: () => seek.current
  }))
  const onPause = () => {
    Log.g('onPause', index)
    if (paused) return
    keyP.current = false
    keyOL.current = false
    keyV.current = false
    setPaused(true)
    // setLoading(true)
  }
  const onPlay = () => {
    Log.g('onPlay-VideoAndroid', index)
    keyP.current = true
    setPaused(false)
    // refLive.current?.play()//???
  }
  const onPlaySeek = async (value: number) => {
    // Log.d('play video ios')
    keyP.current = true
    if (keyOL.current) {
      refVideo.current?.seek(value)
      refLive.current?.play()
      setPaused(false)
    }
  }
  const onLoad = async (data: any) => {
    // Log.d('onLoad')
    refVideo.current?.seek(seek.current)
    keyOL.current = true

    await setLoading(false)
    await onReadyPause()
    //
    if (lengthTime.current === -1) {
      refMenuVideo.current?.setLength(data.duration)
      lengthTime.current = data.duration
    }
  }
  const onError = (e: any) => {
    Log.d('onError', e)
  }
  const onLoadStart = async () => {
    setLoading(true)
  }
  const onReadyPause = () => {
    Log.d('onReadyPause1', keyOL.current)
    Log.d('onReadyPause2', keyP.current)
    Log.d('onReadyPause3', loading)
    refLive.current?.play()
    if (keyOL.current && keyP.current && !loading) {
      keyV.current = true
      Log.d('onReadyPause5')
      setPaused(false)

    }
  }
  const onChangePlay = async () => {
    Log.d('onChangePlay1')
    Log.d('onChangePlay1', refLive.current)
    keyP.current = true
    keyOL.current = true
    keyV.current = true

    if (keyOL.current && keyP.current && !loading && keyV.current) {
      Log.d('onChangePlay2')
      !paused && refLive.current?.pause()
      paused && refLive.current?.play()
      await setPaused(prev => !prev)
    }
  }
  // Log.e('paused', paused)
  const onProgress = (data: any) => {
    // Log.d('onProgress', index)
    if (!paused) {
      seek.current = data.currentTime
      refMenuVideo.current?.setPoint(data.currentTime)
    }
  }
  const onEnd = () => {
    // Log.d('onEnd')
    seek.current = 0
    setPaused(true)

    refVideo.current?.seek(0)
    refMenuVideo.current?.setPoint(0)
    refLive.current?.clear()
  }
  const onSlidingComplete = (t: any) => {
    seek.current = t
    refMenuVideo.current?.setPoint(t)
    refVideo.current?.seek(t)

    setPaused(false)
  }
  const onSlidingStart = () => {
    // Log.d('onSlidingStart')
    setPaused(true)
  }
  useEffect(() => {
    if (index === 0) {
      keyOL.current = true
    }
  }, [])

  const getSizePlay = (height: number) => {
    if (height * 0.2 > 23) return 50
    return height * 0.2
  }
  if (isEmpty(props.source)) return <View style={{ width: width, height: 300 }} />
  const Height = height || DimensionsWidth
  const Width = width || DimensionsWidth
  return (
    <TouchableOpacity
      disabled={disableContainer}
      style={[styles.container, styleContainer]}
      activeOpacity={1}
      onPress={onChangePlay}>
      {timeStart && <Live hidden={!isLive} ref={refLive} timeStart={timeStart} width={Width} height={Height} />}
      <Video
        ref={refVideo}
        paused={paused}
        source={props.source}
        // repeat={repeat}
        repeat={false}
        onProgress={onProgress}
        onReadyForDisplay={() => Log.g('onReadyForDisplay')}
        onEnd={onEnd}
        onLoad={onLoad}
        onLoadStart={onLoadStart}
        onError={onError}
        style={[{ width: Width, height: Height, opacity: 1 }, styleVideo]}
        resizeMode='contain'
        volume={1}
        rate={1.0}
        muted={false}
        // shouldPlay={true}
        ignoreSilentSwitch='ignore'
      />
      <View style={styles.icon}>
        {loading && (
          <ActivityIndicator color={styleLoading?.color || colorPlay} size={getSizePlay(Height)} />
        )}
        {!loading && paused && (
          <IconC name='play' color={styleLoading?.color || colorPlay} size={getSizePlay(Height)} />
        )}
      </View>
      <Menu
        ref={refMenuVideo}
        onSlidingComplete={onSlidingComplete}
        onSlidingStart={onSlidingStart}
        onChangePlay={onChangePlay}
        paused={paused}
        width={Width}
        height={Height}
        hidden={hiddenMenu}
      />
    </TouchableOpacity>
  )
})
const DimensionsWidth = Dimensions.get('window').width
const colorPlay = '#fff'
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden'
  },
  icon: {
    position: 'absolute',
  },
})
