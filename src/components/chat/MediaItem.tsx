import {Dimensions, Image, StyleSheet, TouchableOpacity} from 'react-native'
import React from 'react'
import {IconC} from '@mylib'
import {Log, uriImg} from '@utils'
import VideoPlayer from '@components/view/VideoBasic'

const styles = StyleSheet.create({
  boxMess: {
    flexDirection: 'row',
    padding: 10,
    overflow: 'hidden',
    backgroundColor: '#ddd',
  },
  boxTopMess: {
    // backgroundColor: '#DDDDDDD2',
    backgroundColor: 'pink',
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 20,
    overflow: 'hidden',
    marginRight: 10,
  },
  itemMedia: {
    marginTop: 5,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#ddd',
    height: 130,
    maxWidth: Dimensions.get('screen').width * 0.5,
  },
})
export default function MediaItem ({
  images,
  videos,
  onPress,
}: {
  images: any[]
  videos: any[]
  onPress: () => void
}) {
  // Log.e('images', images)
  return (
    <>
      {images.map((item, index) => (
        <TouchableOpacity
          key={index}
          onPress={onPress}
          style={styles.itemMedia}>
          <Image
            source={uriImg(item)}
            style={{
              width: Dimensions.get('screen').width * 0.5,
              height: 130,
              resizeMode: 'cover',
              borderRadius: 10,
              overflow: 'hidden',
            }}
          />
        </TouchableOpacity>
      ))}
      {videos.map((item, index) => (
        <TouchableOpacity
          key={index}
          onPress={onPress}
          style={styles.itemMedia}>
          <VideoPlayer
            source={uriImg(item)}
            width={Dimensions.get('screen').width * 0.5}
            height={130}
            showOption={false}
            disabled
          />
          <IconC
            style={{
              position: 'absolute',
              left: 80,
              top: 50,
            }}
            name='play'
            color='#fff'
            size={30}
          />
        </TouchableOpacity>
      ))}
    </>
  )
}
