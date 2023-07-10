
/**
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 */
// import React, { useRef, useState } from 'react';
// import { View, StyleSheet, Text, Animated, Keyboard } from 'react-native';
// import { TapGestureHandler, State } from 'react-native-gesture-handler';
// import { TouchableOpacity } from 'react-native';
// import { Log } from '@utils/Log';

// export default function TapGesture() {

//   const [likeColor, setLikeColor] = useState('red');
//   const doubleTapRef = useRef(null);
//   const onDoubleTapEvent = (event:any) => {
//     if (event.nativeEvent.state === State.ACTIVE) {
//       likeColor === 'blue'
//         ? setLikeColor('red')
//         : setLikeColor('blue');
//     }
//   };
//   function onBegan(){
//     // console.log('onBegan11111')
//     Animated.timing(opacity,{
//         toValue:0.5,
//         duration:50,
//         useNativeDriver:true
//        }).start()
//   }
//   function onFailed(){
//     // console.log('onFailed222222')
//     Animated.timing(opacity,{
//         toValue:1,
//         duration:100,
//         useNativeDriver:true
//        }).start()
//   }
//   const styles = StyleSheet.create({
//     square: {
//       width: 150,
//       height: 150,
//       backgroundColor: likeColor,
//       marginTop: 22,
//       marginBottom: 22,
//     },
//   });
//   const opacity=useRef (new Animated.Value(1)).current
//   return (
//     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//       <Text>Double and Single Tap Gesture Handler</Text>
//       <TapGestureHandler
//         onBegan={onBegan}
//         onEnded={onFailed}
//         onActivated={()=>console.log('onActivated')}
//         onFailed={onFailed}
//         onCancelled={()=>console.log('onCancelled')}
//         ref={doubleTapRef}
//         onHandlerStateChange={onDoubleTapEvent}
//         numberOfTaps={2}
//       >
//         <Animated.View    style={[{opacity },styles.square]} />
//       </TapGestureHandler>
//        <TouchableOpacity  style={[ styles.square,{backgroundColor:'blue'}]}/>
//     </View>
//   );
// }
/**
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 */
/**
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 */
// import React, { Component } from 'react';
// import { View, Image, StyleSheet, Animated, ScrollView } from 'react-native';
// import { PinchGestureHandler, State } from 'react-native-gesture-handler';
// export default class PinchToZoom extends Component {
//   baseScale = new Animated.Value(1);
//   pinchScale = new Animated.Value(1);
//   scale = Animated.multiply(this.baseScale, this.pinchScale);
//   lastScale = 1;
//   onPinchGestureEvent = Animated.event(
//     [{ nativeEvent: { scale: this.pinchScale } }],
//     { useNativeDriver: true }
//   );
//   onPinchHandlerStateChange = (event) => {
//     if (event.nativeEvent.oldState === State.ACTIVE) {
//       this.lastScale *= event.nativeEvent.scale;
//       this.baseScale.setValue(this.lastScale);
//       this.pinchScale.setValue(1);
//     }
//   };
//   render() {
//     return (
//       <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>

//         <PinchGestureHandler
//           onGestureEvent={this.onPinchGestureEvent}
//           onHandlerStateChange={this.onPinchHandlerStateChange}
//         >
//           <Animated.View
//             style={[
//               styles.pinchableImage,
//               {
//                 transform: [{ perspective: 1 }, { scale: this.scale }],
//               },
//             ]}
//           >
//             <ScrollView scrollEnabled={false}>
//               <ScrollView horizontal scrollEnabled={false}>
//                 <View>
//                   {
//                     [...new Array(100).keys()].map((m, n) =>
//                       <View key={n} style={{ flexDirection: 'row' }}>
//                         {[...new Array(100).keys()].map((i, j) =>
//                           <View key={j} style={{ width: 30, height: 30, backgroundColor: 'red', margin: 5 }}>
//                           </View>
//                         )}
//                       </View>
//                     )}
//                 </View>
//               </ScrollView>
//             </ScrollView>
//             {/* <Image source={{ uri: "https://kenh14cdn.com/thumb_w/660/2020/7/17/brvn-15950048783381206275371.jpg" }} style={{ width: '100%', height: '100%' }} /> */}
//           </Animated.View>
//         </PinchGestureHandler>
//       </View>
//     );
//   }
// }
// const styles = StyleSheet.create({
//   pinchableImage: {
//     width: '90%',
//     height: '80%',
//     backgroundColor: '#28b5b5',
//     marginTop: 22,
//     marginBottom: 22,
//   },
// });

// import React, { Component } from 'react';
// import { Animated, Dimensions, StyleSheet, Text, View } from 'react-native';
// import {
// import { name } from '@assets/langs/type';
//   Directions,
//   State,
//   FlingGestureHandlerStateChangeEvent,
// } from 'react-native-gesture-handler';

// let USE_NATIVE_DRIVER = true
// const windowWidth = Dimensions.get('window').width;
// const circleRadius = 30;

// class Fling extends Component {
//   private touchX: Animated.Value;
//   private translateX: Animated.AnimatedAddition<number>;
//   private translateY: Animated.Value;
//   constructor(props: Record<string, unknown>) {
//     super(props);
//     this.touchX = new Animated.Value(windowWidth / 2 - circleRadius);
//     this.translateX = Animated.add(
//       this.touchX,
//       new Animated.Value(-circleRadius)
//     );
//     this.translateY = new Animated.Value(0);
//   }

//   private onHorizontalFlingHandlerStateChange = (
//     { nativeEvent }: FlingGestureHandlerStateChangeEvent,
//     offset: number
//   ) => {
//     if (nativeEvent.oldState === State.ACTIVE) {
//       Animated.spring(this.touchX, {
//         // @ts-ignore private property
//         toValue: Animated.add(this.touchX, offset),
//         useNativeDriver: USE_NATIVE_DRIVER,
//       }).start();
//     }
//   };

//   private onVerticalFlingHandlerStateChange = ({
//     nativeEvent,
//   }: FlingGestureHandlerStateChangeEvent) => {
//     console.log('onVerticalFlingHandlerStateChange', nativeEvent)
//     if (nativeEvent.oldState === State.ACTIVE) {
//       Animated.spring(this.translateY, {
//         toValue: Animated.add(this.translateY, 10) as Animated.Value,
//         useNativeDriver: USE_NATIVE_DRIVER,
//       }).start();
//     }
//   };

//   render() {
//     return (
//       <FlingGestureHandler
//         direction={Directions.UP}
//         numberOfPointers={2}
//         onHandlerStateChange={this.onVerticalFlingHandlerStateChange}>
//         <FlingGestureHandler
//           direction={Directions.RIGHT | Directions.LEFT}
//           onHandlerStateChange={(ev) => {
//             console.log('e', ev.nativeEvent)
//             this.onHorizontalFlingHandlerStateChange(ev, -10)
//           }
//           }>
//           <View style={styles.horizontalPan}>
//             <Animated.View
//               style={[
//                 styles.circle,
//                 {
//                   transform: [
//                     {
//                       translateX: this.translateX,
//                     },
//                     {
//                       translateY: this.translateY,
//                     },
//                   ],
//                 },
//               ]}
//             />
//           </View>
//         </FlingGestureHandler>
//       </FlingGestureHandler>
//     );
//   }
// }

// export default class Example extends Component {
//   render() {
//     return (
//       <View>
//         <Fling />
//         <Text>
//           Move up (with two fingers) or right/left (with one finger) and watch
//           magic happens
//         </Text>
//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   horizontalPan: {
//     backgroundColor: '#f76f41',
//     height: 300,
//     justifyContent: 'center',
//     marginVertical: 10,
//   },
//   circle: {
//     backgroundColor: '#42a5f5',
//     borderRadius: circleRadius,
//     height: circleRadius * 2,
//     width: circleRadius * 2,
//   },
// });
/***
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 */

/**
 *
 *
 *
 *
 *
 */

// import {
//   Text,
//   View,
//   StyleSheet,
//   Animated,
//   Button,
//   TouchableOpacity,
//   Easing,
//   Image,
//   ScrollView,
//   FlatList,
//   ImageBackground,
//   Dimensions,
// } from 'react-native'
// import {ButtonRipple} from '@mylib'
// import React, {useRef, useEffect, useState} from 'react'
// import {sleep} from '@utils/array'
// import {Log} from '@utils/Log'
// const {width, height} = Dimensions.get('screen')
// const www = width // 300
// const hhh = height //350
// const values = [-(hhh / 2), -(hhh / 2 - 20)]
// const _heightColum = 200
// const _widthColum = 30
// const _border = 10
// const wSquare = 60
// const hSquare = wSquare
// let __h = hhh / 2 - hSquare / 2
// const _timeUp = 300
// const _timeDow = 800
// const _dum = 50
// const dataColumn = [...new Array(100).keys()].map((i, index) => {
//   let max = hhh / 2
//   let min = 80
//   let heightTop = Math.random() * (max - min) + min
//   const lever = 350
//   let heightBot = hhh - heightTop - lever
//   return {
//     id: index,
//     heightTop,
//     heightBot,
//     lever,
//   }
// })
// export default function App () {
//   const _height = useRef(new Animated.Value(0)).current
//   const animate = useRef(new Animated.Value(0)).current
//   const rotateZ = animate.interpolate({
//     inputRange: [-1, 0, 1],
//     outputRange: ['50deg', '0deg', '-30deg'],
//   })
//   const moveX = useRef(new Animated.Value(0)).current
//   const moveX2 = useRef(new Animated.Value(0)).current
//   const height1 = useRef(new Animated.Value(0)).current
//   const height2 = useRef(new Animated.Value(0)).current
//   const f1 = () => {
//     // Animated.loop(
//     Animated.sequence([
//       Animated.timing(_height, {
//         toValue: -_dum,
//         useNativeDriver: false,
//         duration: _timeUp,
//         easing: Easing.bezier(0.34, 1.56, 0.64, 1),
//       }),
//       Animated.timing(_height, {
//         toValue: hhh / 2,
//         useNativeDriver: false,
//         duration: _timeDow,
//         easing: Easing.bezier(0.88, 0.63, 1, 1),
//       }),
//     ]).start()
//   }
//   const [round, setRound] = useState(0)
//   useEffect(() => {
//     _start.current && f2()
//   }, [round])
//   const f2 = async () => {
//     let m1 = -((Math.random() * hhh) / 2)
//     Log.d('m1', m1)
//     let m2 = Math.random() * values.length
//     let m3 = Math.random() < 0.5 ? m1 + 50 : m1 - 50
//     Animated.parallel([
//       Animated.parallel([
//         Animated.timing(height1, {
//           toValue: m1,
//           useNativeDriver: false,
//           duration: 1000,
//         }),
//         Animated.timing(height2, {
//           toValue: m3,
//           useNativeDriver: false,
//           duration: 1500,
//         }),
//       ]),
//       //
//       Animated.parallel([
//         Animated.timing(moveX, {
//           toValue: -www * 1.5,
//           useNativeDriver: false,
//           duration: 5000,
//         }),
//         Animated.timing(moveX2, {
//           toValue: -www * 1.5 - 30,
//           useNativeDriver: false,
//           duration: 5000,
//         }),
//       ]),
//       //

//       //
//     ]).start(() => {
//       moveX.setValue(0)
//       moveX2.setValue(0)
//       setTimeout(() => {
//         setRound(r => r + 1)
//       }, 500)
//     })
//   }
//   useEffect(() => {
//     // f1();
//     // f2();
//     _height.addListener(e => {
//       __h = e.value
//       Log.e('do cao cua chim', __h)
//     })
//   }, [])
//   function setBtn () {
//     if (_over.current) return
//     if (_start.current == false) return start()
//     Animated.sequence([
//       Animated.parallel([
//         Animated.timing(_height, {
//           toValue: __h - _dum,
//           useNativeDriver: false,
//           duration: _timeUp,
//           easing: Easing.bezier(0.34, 1.56, 0.64, 1),
//         }),
//         Animated.timing(animate, {
//           toValue: 1,
//           useNativeDriver: false,
//           duration: _timeUp,
//           easing: Easing.bezier(0.34, 1.56, 0.64, 1),
//         }),
//       ]),
//       Animated.parallel([
//         Animated.timing(_height, {
//           toValue: hhh / 2,
//           useNativeDriver: false,
//           duration: _timeDow,
//           easing: Easing.bezier(0.88, 0.63, 1, 1),
//         }),
//         Animated.timing(animate, {
//           toValue: -1,
//           useNativeDriver: false,
//           duration: _timeDow,
//           easing: Easing.bezier(0.88, 0.63, 1, 1),
//         }),
//       ]),
//     ]).start()

//     // f1()
//     // console.log('asdsa', _height)
//   }
//   if (!__DEV__) return null

//   // const [start,setStart]=useState(false)
//   const _start = useRef(false)
//   const _over = useRef(false)
//   const start = () => {
//     _start.current = true
//     f1()
//     dev()
//     // f2()
//   }
//   const dev = () => {
//     const cache = setInterval(() => {
//       _offset.current += www * 0.65 * (1 / 5)
//       Log.d('quang duowng', _offset.current)
//       flatRef.current?.scrollToOffset({offset: _offset.current, animated: true})
//       let index = _offset.current / (www * 0.65)
//       Log.d('index column', index)
//       if (index + 1 > dataColumn.length) clearInterval(cache)
//       // else if (Number.isInteger(index)) {
//       //   Log.d('info cot', dataColumn[index])
//       //   let info = dataColumn[index]
//       //   if (info) {
//       //     let min = info?.heightTop
//       //     let max = info?.heightTop + info?.lever
//       //     let y_bird = hhh / 2 + __h
//       //     if (y_bird < min || y_bird > max) {
//       //       _height.stopAnimation()
//       //       _over.current = true
//       //       clearInterval(cache)
//       //     }
//       //   }
//       // }
//     }, 200)
//   }
//   const _offset = useRef(0)
//   const flatRef = useRef<FlatList>(null)
//   return (
//     <View style={styles.container}>
//       <ButtonRipple
//         onPress={setBtn}
//         style={styles.c1}
//         rippleOpacity={0.2}
//         rippleColor={'pink'}>
//         <ImageBackground style={{flex: 1}} source={require('./bg.gif')}>
//           <Animated.View
//             style={{
//               width: wSquare,
//               height: hSquare,
//               // backgroundColor: 'red',
//               position: 'absolute',
//               top: hhh / 2 - hSquare / 2,
//               left: www / 2 - wSquare / 2,
//               transform: [{translateY: _height}, {rotateZ}],
//               zIndex: 999,
//             }}>
//             <Image
//               source={require('./bird33.png')}
//               style={{width: wSquare, height: hSquare, resizeMode: 'contain'}}
//             />
//           </Animated.View>
//           <FlatList
//             ref={flatRef}
//             horizontal
//             // scrollEnabled={false}
//             contentContainerStyle={{}}
//             data={dataColumn}
//             renderItem={({item, index}) => (
//               <View
//                 style={{
//                   width: www * 0.65,
//                   height: hhh,
//                   // backgroundColor: '#fff',
//                 }}>
//                 <View
//                   style={{
//                     width: _widthColum,
//                     height: item.heightTop,
//                     backgroundColor: 'green',
//                     position: 'absolute',
//                     left: 0,
//                   }}>
//                   <View
//                     style={{
//                       width: _widthColum + _border,
//                       height: _widthColum,
//                       backgroundColor: 'green',
//                       borderRadius: 5,
//                       position: 'absolute',
//                       bottom: 0,
//                       left: -_border / 2,
//                     }}
//                   />
//                 </View>
//                 <Text
//                   style={{
//                     position: 'absolute',
//                     left: (www * 0.65) / 2,
//                     top: 0.2 * hhh,
//                     textAlign: 'center',
//                     color: '#fff',
//                     fontWeight: '900',
//                     fontSize: 28,
//                   }}>
//                   {index}
//                 </Text>
//                 <View
//                   style={{
//                     width: _widthColum,
//                     height: item.heightBot,
//                     backgroundColor: 'green',
//                     position: 'absolute',
//                     left: 0,
//                     bottom: 0,
//                   }}>
//                   <View
//                     style={{
//                       width: _widthColum + _border,
//                       height: _widthColum,
//                       backgroundColor: 'green',
//                       borderRadius: 5,
//                       position: 'absolute',
//                       left: -_border / 2,
//                       top: 0,
//                     }}
//                   />
//                 </View>
//               </View>
//             )}
//             ItemSeparatorComponent={() => <View style={{width: 1}} />}
//           />

//           <TouchableOpacity
//             style={{
//               width: 20,
//               height: 20,
//               position: 'absolute',
//               right: 0,
//               backgroundColor: 'red',
//             }}
//             onPress={dev}
//           />
//         </ImageBackground>
//       </ButtonRipple>
//     </View>
//   )
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     // justifyContent: 'center',
//     paddingTop: 80,
//     backgroundColor: 'gray',
//     alignItems: 'center',
//   },
//   c1: {
//     height: hhh,
//     width: www,
//     backgroundColor: '#FFF',
//     // overflow: 'hidden',
//   },
// })
