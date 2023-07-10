import React, {
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
  StyleSheet,
  ViewProps,
} from 'react-native'
import Video from 'react-native-video'
import { Live, LiveRef, Menu, MenuVideoRef } from './menu'
import { isEmpty } from 'underscore'
import { Log } from '@utils'
import { IconC } from '@mylib'


export type VideoIOSProps = {
  index?: number
  source?: any,
  width?: number,
  height?: number
  hiddenMenu?: boolean
  disableContainer?: boolean
  styleContainer?: ViewProps['style']
  styleVideo?: ViewProps['style']
  styleLoading?: { color?: string }
  autoPause?: number
  isLive?: boolean

  timeStart?: string
}
export type VideoIOSRef = {
  pause?: () => any
  play?: () => any
}



export const VideoIOS = forwardRef<VideoIOSRef, VideoIOSProps>((
  {
    styleContainer,
    styleVideo,
    styleLoading,
    height,
    width,
    hiddenMenu,
    disableContainer,
    index,
    autoPause,
    isLive,
    timeStart,
    ...props
  }, ref) => {
  // Log.d('disableContainer', disableContainer)
  Log.d('isLive', isLive)
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
  const [paused, setPaused] = useState(true)
  const [loading, setLoading] = useState(true)

  const lengthTime = useRef<number>(-1)
  const seek = useRef<number>(0)
  const keyOL = useRef<boolean>(false)
  const keyP = useRef<boolean>(false)
  const refMenuVideo = useRef<MenuVideoRef>({})
  const refVideo = useRef<React.ComponentPropsWithRef<typeof Video>>()
  const refLive = useRef<LiveRef>()
  const onPause = () => {
    if (paused) return
    keyP.current = false
    setPaused(true)
  }
  const onPlay = async () => {
    Log.d('play video ios')
    keyP.current = true
    if (keyOL.current) {
      setPaused(false)
      refLive.current?.play()//???
    }

  }
  const onPlaySeek = async (value: number) => {
    Log.d('play video ios')
    keyP.current = true
    if (keyOL.current) {
      refVideo.current?.seek(value)
      setPaused(false)
      refLive.current?.play()
    }
  }
  /**
   * 
   * @param data 
   */
  const onLoad = async (data: any) => {
    Log.d('onLoad', seek)
    keyOL.current = true
    await setLoading(false)
    if (keyP.current) {
      await refVideo.current?.seek(seek.current)
      await setPaused(false)
    }
    if (lengthTime.current === -1) {
      refMenuVideo.current?.setLength(data.duration)
      lengthTime.current = data.duration
    }
  }
  const onLoadStart = () => {
    // Log.d('onLoadStart')
  }

  const onChangePlay = () => {
    Log.d('onChangePlay')
    keyP.current = true
    if (keyOL.current && keyP.current && !loading) {
      !paused && refLive.current?.pause()
      paused && refLive.current?.play()

      setPaused(prev => !prev)
    }
  }
  //******************************************** */
  const onProgress = (data: any) => {
    Log.d('onProgress')
    if (!paused) {
      seek.current = data.currentTime
      refMenuVideo.current?.setPoint(data.currentTime)
    }
  }
  const onEnd = async () => {
    Log.d('onEnd')
    seek.current = 0

    await setPaused(true)
    refVideo.current?.seek(0)
    refMenuVideo.current?.setPoint(0)
    refLive.current?.clear()
  }
  const onSlidingComplete = (t: number) => {
    Log.d('onSlidingComplete')
    seek.current = t
    refMenuVideo.current?.setPoint(t)
    Log.d('onSlidingComplete', t)
    refVideo.current?.seek(t)
    setPaused(false)
  }
  const onSlidingStart = () => {
    Log.d('onSlidingStart')
    setPaused(true)
  }
  useEffect(() => {
    if (index === 0) {
      keyOL.current = true
    }
    if (autoPause) {
      setPaused(false)
      setTimeout(() => { setPaused(true) }, autoPause)
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
        // repeat={props.repeat}
        repeat={false}
        onProgress={onProgress}
        onEnd={onEnd}
        onLoad={onLoad}
        onLoadStart={onLoadStart}
        style={[{ width: Width, height: Height, opacity: paused ? 0.2 : 1 }, styleVideo]}
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
