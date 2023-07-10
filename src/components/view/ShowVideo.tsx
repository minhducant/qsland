import { TouchableOpacity, View } from 'react-native'
import React, { useRef } from 'react'
import { TextApp, } from '@components'
import { Log, uriImg } from '@utils'
import { screen_width } from '@components'
import VideoPlayer from './VideoBasic'
import ShowVideoFull from './ShowVideoFull'
import { isArray, isEmpty } from 'underscore'
import { AppColor } from '@assets/colors'

export const ShowVideo = ({ data, disabled = false, del }: any) => {
  Log.d('ShowVideo', data)
  if (!Array.isArray(data)) return null
  const refFull: any = useRef()
  return (
    <>
      <View style={{ flexDirection: 'row' }}>
        {data.slice(0, 3).map((item: any, index: number) => (
          <TouchableOpacity
            disabled={disabled}
            onPress={() => {
              refFull.current.visible(true)
            }}
            key={index}
            style={{
              borderWidth: 0.8,
              borderColor: AppColor('primary'),
              width: screen_width * 0.3,
              height: screen_width * 0.2,
              backgroundColor: '#000',
              overflow: 'hidden',
            }}>
            <VideoPlayer
              disabled
              source={uriImg(item?.uri)}
              width={screen_width * 0.3}
              height={screen_width * 0.2}
              showOption={false}
            />
            {index === 2 && data.length > 3 && (
              <ViewC
                mid
                style={{
                  width: screen_width * 0.3,
                  height: screen_width * 0.2,
                  backgroundColor: '#00000088',
                  position: 'absolute',
                }}>
                <TextApp color='#fff' size={16} bold>{`+${data.length -
                  3}`}</TextApp>
              </ViewC>
            )}
          </TouchableOpacity>
        ))}
      </View>
      <ShowVideoFull del={del} ref={refFull} data={fmDataShowVideo(data)} />
    </>
  )
}
export const fmDataShowVideo = (data: any[]) => {
  if (!isEmpty(data) && isArray(data)) {
    let result: any[] = []
    data.forEach(item => {
      let mi: any = {}
      mi.uri = item.uri
      mi.type = 'video'
      result.push(mi)
    })
    return result
  }
  return []
}
