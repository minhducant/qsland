import React, {createRef} from 'react'
import {StyleSheet, View, Image, Dimensions, Platform} from 'react-native'
import Swiper from 'react-native-swiper'

import ItemBadge from './ItemBadge'
import VideoIOS from '../VideoBasic/VideoIOS'
import VideoBasic from '../VideoBasic'
import {Log} from '@utils'
export default class SwiperMedia extends React.Component {
  constructor (props) {
    super(props)
    this.refSwiper = React.createRef(null)
    this.refArray = createRef()
    this.refBadge = createRef()
    this.state = {
      media: this.props.data,
    }
    // this.media = this.props.data
    this.refArray.current = this.state.media.map((item, index) => {
      return createRef()
    })
    this.idPrevious = 0
  }

  onChangeIdCurrent = async idCurrent => {
    this.props.onChangeIdCurrent(idCurrent)
    // logInfo('*', '********onChangeIdCurrent', idCurrent)
    await this.refBadge.current.setValue(idCurrent)
    if (this.state.media[this.idPrevious].type === 'video') {
      this.refArray.current[this.idPrevious].current.pauseVideo()
    }
    if (this.state.media[idCurrent].type === 'video') {
      this.refArray.current[idCurrent].current.playVideo()
    }
    this.idPrevious = idCurrent
    return null
  }
  render () {
    // Log.e('********SwiperMedia', this.props.data)
    // Log.e('', '********SwiperMedia-this.state.media', this.state.media)
    return (
      <View
        style={[
          {
            alignItems: 'center',
            width: width,
            minHeight: this.props.heightSwiper,
            backgroundColor: '#ddd',
          },
          this.props?.styleBox,
        ]}>
        <Swiper
          ref={this.refSwiper}
          loop={false}
          style={{height: this.props.heightSwiper}}
          //   showsButtons={true}
          showsPagination={false}
          onIndexChanged={this.onChangeIdCurrent}
          index={0}>
          {this.state.media.map((item, key) => (
            <View key={key} style={{alignItems: 'center'}}>
              {item.type === 'video' && (
                <>
                  {Platform.OS === 'ios' ? (
                    <VideoIOS
                      height={this.props.heightVideo}
                      ref={this.refArray.current[key]}
                      index={key}
                      source={{uri: item.uri}}
                      repeat={false}
                    />
                  ) : (
                    <VideoBasic
                      height={this.props.heightVideo}
                      ref={this.refArray.current[key]}
                      index={key}
                      source={{uri: item.uri}}
                      repeat={false}
                    />
                  )}
                </>
              )}
              {item.type === 'image' && (
                <Image
                  source={
                    item.uri !== ''
                      ? {
                          uri: item.uri,
                        }
                      : {
                          uri: 'https://en.hongngochospital.vn/wp-content/themes/hongngoc/images/no-image.jpg',
                        }
                  }
                  style={{
                    width: this.props.widthImage,
                    height: this.props.heightVideo + 40,
                    resizeMode: 'contain',
                  }}
                />
              )}
            </View>
          ))}
        </Swiper>
        <ItemBadge
          style={this.props?.styleBadge}
          styleTextBadge={this.props?.styleTextBadge}
          ref={this.refBadge}
          quantity={this.state.media.length}
        />
      </View>
    )
  }
}
SwiperMedia.defaultProps = {
  heightVideo: 260,
  heightSwiper: 330,
  heightImage: 0,

  widthImage: 380,
}
const {width} = Dimensions.get('window')
