import React, { useState, useRef, useEffect } from 'react'
import {
  ActivityIndicator,
  Image,
  ImageProps,
  View,
  ImagePropsBase,
  ViewProps,
} from 'react-native'
const noimage = `data:image/jpg;base64,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`
interface Props extends ImagePropsBase {
  source: ImagePropsBase['source']
  width?: ImagePropsBase['width']
  height?: ImagePropsBase['height']
  resizeMode?: ImagePropsBase['resizeMode']
  style?: ImageProps['style']
  defaultSource?: ImagePropsBase['defaultSource']
  errorHidden?: boolean
  hidden?: boolean
  sourceError?: ImagePropsBase['source']
  containerStyle?: ViewProps['style']
  loadingStyle?: ViewProps['style']
  sizeLoading?: number
  colorLoading?: string
}
const ImageC: React.FC<Props> = props => {
  const {
    source,
    width,
    height,
    resizeMode = 'contain',
    style,
    defaultSource,
    errorHidden = false,
    hidden = false,
    sourceError = { uri: noimage },
    containerStyle,
    ...prop
  } = props
  if (!source || source === null || source === undefined) return null
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  const stopLoading = useRef<any>()
  useEffect(() => {
    setError(false)
    return () => {
      stopLoading.current && clearTimeout(stopLoading.current)
    }
  }, [source])
  if (hidden) return null
  if (errorHidden && error) return null
  return (
    <View style={containerStyle}>
      <Image
        source={error ? (defaultSource ?? sourceError) : source}
        defaultSource={defaultSource}
        style={[{ width: width, height: height }, style]}

        onLoadStart={() => {
          setLoading(true)
          stopLoading.current = setTimeout(() => {
            setLoading(false)
          }, 3000)
          props.onLoadStart && props.onLoadStart()
        }}
        onLoadEnd={() => {
          setLoading(false)
          props.onLoadEnd && props.onLoadEnd()
        }}
        onError={(error) => {
          setError(true)
          console.log('|onError|', { error: error.nativeEvent, source })
          props.onError && props.onError(error)
        }}
        {...prop}
      />
      {loading && (
        <ActivityIndicator
          color={prop.colorLoading ?? '#1868ae'}
          size={prop.sizeLoading ?? 20}
          style={[{ position: 'absolute' }, prop.loadingStyle]}
        />
      )}
    </View>
  )
}
export default ImageC
