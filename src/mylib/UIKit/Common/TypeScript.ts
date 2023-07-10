import { Text } from 'react-native'

export type getProps1 = React.ComponentPropsWithoutRef<typeof Text>
// type getRef1 = React.ComponentRef<typeof ModalC>
// React.createElement(Text, {}, props.children)
//isValidElement(props.content)
// type Arrayish = { [n: number]: unknown };
// type A = keyof Arrayish;
// type A = keyof typeof object;
// export type _useHook<T> = Parameters<
//   (isLoading: boolean, data: T, onRefresh: () => void) => void
// >
//get type props in interface TextInputProps['keyboardType']
//get props type in object form
// let type=keyof typeof object
//arr type =[type1, type2]
//get type function
//export type RootState = ReturnType<typeof store.getState>
//
//type a={b:1,c:2}
//type d=b|c from a
// interface SliderProps {
//   index: number;
//   setIndex: (value: number) => void;
//   children: ReactElement<SlideProps>;
//   prev?: ReactElement<SlideProps>;
//   next?: ReactElement<SlideProps>;
// }
