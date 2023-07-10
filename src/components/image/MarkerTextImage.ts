import Marker, {
  Position,
  ImageFormat,
  TextBackgroundType,
} from 'react-native-image-marker'
import {Platform} from 'react-native'

export const MarkerTextImage = async (
  source: string,
  text: string,
  fontsize?: any,
) => {
  const path = await Marker.markText({
    src: source,
    text: text,
    position: Position.bottomCenter,
    // color: 'red',
    // // fontName: 'Arial-BoldItalicMT',
    // fontSize: 24,
    // scale: 1,
    // quality: 100,
    saveFormat: ImageFormat.jpg,
    // maxSize: 2048,
    /******* */
    color: '#FF0000',
    fontName: 'Arial-BoldItalicMT',
    fontSize: fontsize ? fontsize : Platform.OS == 'ios' ? 35 : 35,
    shadowStyle: {
      dx: 2,
      dy: 2,
      radius: 30,
      color: '#fff',
    },

    scale: 1,
    quality: 100,
  })
  let result = ''
  result = Platform.OS === 'android' ? 'file://' + path : path
  return result
}
