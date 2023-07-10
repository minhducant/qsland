import { ActivityIndicator, StyleSheet, Dimensions } from 'react-native'
import SafeAreaView, { ForceInsetProp } from 'react-native-safe-area-view'

import React from 'react'
interface _props extends RenderHTMLConfig, RenderHTMLSourceProps { }
const HtmlRender = React.memo(({ ...rest }: _props) => {
  const tagsStyles = {
    a: {
      textDecorationLine: 'none',
    },
    img: { width: Dimensions.get('screen').width - 20, height: Dimensions.get('screen').width - 20, resizeMode: 'cover', }
  };
  if (rest?.html === undefined) return null
  return (
    <RenderHTML
      contentWidth={Dimensions.get('screen').width}
      tagsStyles={tagsStyles}
      renderers={{
        img: CustomImageRenderer,
      }}
      {...rest}
    />
  )
})
export default HtmlRender
const styles = StyleSheet.create({})
import Lightbox from 'react-native-lightbox-v2'

import RenderHTML, {
  IMGElementContainer,
  IMGElementContentError,
  IMGElementContentSuccess,
  RenderHTMLConfig,
  RenderHTMLSourceProps,
  useIMGElementProps,
  useIMGElementState,
} from 'react-native-render-html'
function IMGElementContentLoading({ source, imageStyle, dimensions }: any) {
  return <ActivityIndicator size={23} />
}
function CustomImageRenderer(props: any) {
  const imgElementProps = useIMGElementProps(props)
  const state = useIMGElementState(imgElementProps)
  let content: React.ReactNode = React.createElement(
    IMGElementContentLoading,
    state,
  )
  // console.log('loading-type', state.type)
  if (state.type === 'success') {
    content = React.createElement(IMGElementContentSuccess, state)
  } else if (state.type === 'loading') {
    content = React.createElement(IMGElementContentLoading, state)
  } else {
    content = React.createElement(IMGElementContentError, state)
  }

  return (

    <Lightbox underlayColor='white'  >
      <IMGElementContainer
        // onPress={() => {
        //   console.log('props', content.props.source)
        // }}
        style={state.containerStyle}>
        {content}
      </IMGElementContainer>
    </Lightbox >
  )
}
import { decode } from 'html-entities'
export const WebDisplay = React.memo(function WebDisplay({ html }: any) {
  const tagsStyles = {
    a: {
      textDecorationLine: 'none',
    },
    img: { width: Dimensions.get('screen').width - 20, height: Dimensions.get('screen').width - 20, resizeMode: 'cover', }
  };
  if (html === undefined) return null
  return (
    <RenderHTML
      contentWidth={Dimensions.get('screen').width}
      source={{ html: decode(html) }}
      tagsStyles={tagsStyles}
      renderers={{
        img: CustomImageRenderer,
      }}
    />
  );
});