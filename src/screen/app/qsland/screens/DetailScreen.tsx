import React, { useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  Dimensions
} from 'react-native';
import { SharedElement } from 'react-navigation-shared-element';
import * as Animatable from 'react-native-animatable';
import Ionicons from 'react-native-vector-icons/Ionicons';

const { height } = Dimensions.get('window');
const ITEM_HEIGHT = height * 0.5;

const DetailScreen = ({ navigation, route }: any) => {
  const { item } = route.params;
  const buttonRef = useRef<any>();

  return (
    <View style={{ flex: 1, backgroundColor: '#0f0f0f' }}>
      <SharedElement id={`item.${item.id}.image_url`}>
        <Image
          source={{ uri: item.image_url }}
          style={{
            width: '100%',
            height: ITEM_HEIGHT,
            borderBottomLeftRadius: 20,
            borderBottomRightRadius: 20
          }}
          resizeMode='cover'
        />
      </SharedElement>
      <Animatable.View
        ref={buttonRef}
        animation='fadeIn'
        duration={600}
        delay={300}
        style={[StyleSheet.absoluteFillObject]}
      >
        <Ionicons
          name='close'
          size={28}
          color='#fff'
          style={{
            position: 'absolute',
            top: 40,
            right: 20,
            zIndex: 2
          }}
          onPress={() => {
            // buttonRef.current.fadeOut(500).then(() => {
            navigation.goBack();
            // });
          }}
        />
      </Animatable.View>
      <View
        style={{ flexDirection: 'row', marginTop: 10, paddingHorizontal: 20 }}
      >
        <SharedElement id={`item.${item.id}.iconName`}>
          <Ionicons size={40} color='white' name={item.iconName} />
        </SharedElement>
        <View style={{ flexDirection: 'column', paddingLeft: 6 }}>
          <SharedElement id={`item.${item.id}.title`}>
            <Text
              style={{
                color: 'white',
                fontSize: 24,
                fontWeight: 'bold',
                lineHeight: 28
              }}
            >
              {item.title}
            </Text>
          </SharedElement>
          <SharedElement id={`item.${item.id}.description`}>
            <Text
              style={{
                color: 'white',
                fontSize: 16,
                fontWeight: 'bold',
                lineHeight: 18
              }}
            >
              {item.description}
            </Text>
          </SharedElement>
        </View>
      </View>
    </View>
  );
};

DetailScreen.sharedElements = (route: any) => {
  const { item } = route.params;
  return [
    {
      id: `item.${item.id}.image_url`,
      animation: 'move',
      resize: 'clip'
    },
    {
      id: `item.${item.id}.title`,
      animation: 'fade',
      resize: 'clip'
    },
    {
      id: `item.${item.id}.description`,
      animation: 'fade',
      resize: 'clip'
    },
    {
      id: `item.${item.id}.iconName`,
      animation: 'move',
      resize: 'clip'
    }
  ];
};

export default DetailScreen;
