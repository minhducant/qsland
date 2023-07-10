import {
  FlatList,
  StyleSheet,
  Text,
  View,
  FlatListProps,
  TouchableOpacity,
  Pressable,
  LayoutAnimation,
  Platform,
  UIManager,
  ScrollView,
  Dimensions,
} from 'react-native'
import React, {useState} from 'react'
import SafeAreaView, {
  ForceInsetProp,
  SafeAreaProvider,
} from 'react-native-safe-area-view'
import Ionicons from 'react-native-vector-icons/Ionicons'
if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true)
  }
}
export default function XHRInterceptorView () {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <View style={{backgroundColor: '#fff', flex: 1}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              padding: 10,
              width: '50%',
            }}>
            <Ionicons name='search-outline' size={20} />
            <Ionicons name='trash-outline' size={20} />
            <Ionicons name='swap-vertical-outline' size={20} />
            <Ionicons name='download-outline' size={20} />
          </View>
          <FlatList
            data={[...new Array(100).keys()]}
            renderItem={e => <ItemRequest {...e} />}
            contentContainerStyle={{padding: 2, backgroundColor: '#fff'}}
            ItemSeparatorComponent={() => (
              <View style={{height: 1, backgroundColor: '#fff'}} />
            )}
          />
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  )
}

const ItemRequest = ({item, index}: any) => {
  const [open, setOpen] = useState(false)
  const onPress = () => {
    LayoutAnimation.easeInEaseOut()
    setOpen(p => !p)
  }
  return (
    <View>
      <Pressable
        onPress={onPress}
        style={({pressed}) => [
          {
            width: '100%',
            height: 40,
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: 'row',
            padding: 2,
            backgroundColor: pressed ? 'pink' : '#BCBABA',
          },
        ]}>
        <Text style={{color: '#4F4D4D', fontSize: 12}}>
          {'05:05:15 '}
          <Text style={{color: '#cf6a4c', fontSize: 12}}>{'GET'}</Text>
        </Text>
        <Text
          selectable
          numberOfLines={1}
          style={{color: '#4F4D4D', fontSize: 12}}>
          {'/app/sale_violation/countFilterViolatingCustomers'}
        </Text>
        <Text style={{color: 'gray', fontSize: 12}}>
          <Ionicons name='chevron-down-circle-outline' size={20} />
        </Text>
      </Pressable>
      {open && (
        <View style={{minHeight: 200, backgroundColor: '#ddd'}}>
          <ContainerUrl />
          <Container1 onPress1={onPress} />
          <Container2 />
          <Container3 />
          <Container4 />
        </View>
      )}
    </View>
  )
}
const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#fff'},
  button1: {
    padding: 5,
    backgroundColor: 'gray',
    borderRadius: 5,
    margin: 2,
  },
  text: {
    color: '#cf6a4c',
    fontSize: 12,
  },
})
const ButtonRequest = ({title, onPress}: any) => (
  <TouchableOpacity onPress={onPress} style={styles.button1}>
    <Text>{title}</Text>
  </TouchableOpacity>
)
const Container1 = ({onPress1, onPress2, onPress3}: any) => (
  <View
    style={{
      flexDirection: 'row',
      height: 50,
      alignItems: 'center',
      justifyContent: 'flex-end',
      paddingRight: 30,
      borderWidth: 1,
      marginVertical: 5,
    }}>
    <TouchableOpacity onPress={onPress1}>
      <Ionicons name='chevron-up-circle-outline' size={28} color='gray' />
    </TouchableOpacity>
    <View style={{paddingHorizontal: 10}} />
    <TouchableOpacity onPress={onPress2}>
      <Ionicons name='share-social' size={28} color='gray' />
    </TouchableOpacity>
    <View style={{paddingHorizontal: 10}} />
    <TouchableOpacity onPress={onPress3}>
      <Ionicons name='copy-outline' size={28} color='gray' />
    </TouchableOpacity>
  </View>
)
const Container2 = () => (
  <View style={{padding: 10, borderWidth: 1}}>
    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
      <Text>{'Status Code'}</Text>
      <Text style={{color: 'red'}}>{'200'}</Text>
    </View>
    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
      <Text>{'Method'}</Text>
      <Text style={{color: 'red'}}>{'GET'}</Text>
    </View>
    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
      <Text>{'Duration (ms) '}</Text>
      <Text style={{color: 'red'}}>{'393.61879166960716'}</Text>
    </View>
  </View>
)
const Container3 = () => (
  <View
    style={{
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 5,
      borderWidth: 1,
      marginTop: 5,
    }}>
    <ButtonRequest title={'Response'} />
    <ButtonRequest title={'Response Headers'} />
    <ButtonRequest title={'Request'} />
    <ButtonRequest title={'Request Headers'} />
  </View>
)
const Container4 = () => (
  <View style={{borderWidth: 1, marginVertical: 5}}>
    <ScrollView horizontal pagingEnabled>
      <View
        style={{
          width: Dimensions.get('screen').width,
          height: 300,
          backgroundColor: 'red',
        }}></View>
      <View
        style={{
          width: Dimensions.get('screen').width,
          height: 300,
          backgroundColor: 'green',
        }}></View>
      <View
        style={{
          width: Dimensions.get('screen').width,
          height: 300,
          backgroundColor: 'blue',
        }}></View>
    </ScrollView>
  </View>
)
const ContainerUrl = () => (
  <View style={{borderWidth: 1, marginVertical: 5, padding: 10}}>
    <Text selectable style={{fontSize: 12, flex: 1}}>
      {
        'https://devapi.qsland.s-tech.info/app/sale_violation/countFilterViolatingCustomerscountFilterViolatingCustomerscountFilterViolatingCustomers '
      }
    </Text>
  </View>
)
const HeaderLayout = () => (
  <View style={{backgroundColor: '#fff', flex: 1}}>
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        width: '50%',
      }}>
      <Ionicons name='search-outline' size={20} />
      <Ionicons name='trash-outline' size={20} />
      <Ionicons name='swap-vertical-outline' size={20} />
      <Ionicons name='download-outline' size={20} />
    </View>
    <FlatList
      data={[...new Array(100).keys()]}
      renderItem={e => <ItemRequest {...e} />}
      contentContainerStyle={{padding: 2, backgroundColor: '#fff'}}
      ItemSeparatorComponent={() => (
        <View style={{height: 1, backgroundColor: '#fff'}} />
      )}
    />
  </View>
)
