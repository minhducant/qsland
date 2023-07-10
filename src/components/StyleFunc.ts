import { ImageStyle, TextStyle, ViewStyle } from 'react-native'
/**
 * import
 */
export namespace StyleSheetFC {
  export type T_MulStyle = ViewStyle | TextStyle | ImageStyle
  export type T_NameStyle<T> = { [P in keyof T]: ((...value: any) => T_MulStyle) }
  export function create<T extends T_NameStyle<T> | T_NameStyle<any>>
    (style: T | T_NameStyle<T>) { return style }
}
export function clearUndefined(obj: StyleSheetFC.T_MulStyle) {
  let newOb: any = { ...obj }
  const ret: any = {};
  Object.keys(obj)
    .filter((key) => newOb[key] !== undefined)
    .forEach((key) => ret[key] = newOb[key]);
  return ret;
}
/**
 * 
 * 
 */
export const StyleFunc = StyleSheetFC.create({
  borderRadius: (a?: number, b?: number, c?: number, d?: number) => clearUndefined({
    borderTopLeftRadius: a,
    borderTopRightRadius: b,
    borderBottomRightRadius: c,
    borderBottomLeftRadius: d,
  }),
  borderWidth: (a?: number, b?: number, c?: number, d?: number) => clearUndefined({
    borderTopWidth: a,
    borderRightWidth: b,
    borderBottomWidth: c,
    borderLeftWidth: d,
  }),
  borderColor: (a?: string, b?: string, c?: string, d?: string) => clearUndefined({
    borderTopColor: a,
    borderRightColor: b,
    borderBottomColor: c,
    borderLeftColor: d,
  }),
  padding: (a?: number, b?: number, c?: number, d?: number) => clearUndefined({
    paddingTop: a,
    paddingRight: b,
    paddingBottom: c,
    paddingLeft: d
  }),
  margin: (a?: number, b?: number, c?: number, d?: number) => clearUndefined({
    marginTop: a,
    marginRight: b,
    marginBottom: c,
    marginLeft: d
  }),
  marginVertical: (m?: number) => clearUndefined({
    marginVertical: m,
  }),
  paddingVertical: (m?: number) => clearUndefined({
    paddingVertical: m,
  }),
  marginHorizontal: (m?: number) => clearUndefined({
    marginHorizontal: m,
  }),
  paddingHorizontal: (m?: number) => clearUndefined({
    paddingHorizontal: m,
  }),
  position: (a?: number, b?: number, c?: number, d?: number) => clearUndefined({
    position: 'absolute',
    top: a,
    right: b,
    bottom: c,
    left: d
  }),
  flex: (m?: number) => clearUndefined({
    flex: m,
  }),
  square: (m?: number) => clearUndefined({
    width: m,
    height: m
  }),
  flexDirection: (direction: 'row' | 'column') => clearUndefined({
    flexDirection: direction,
  }),
  shadow: ({ radius, elevation = 1, color = "#000", opacity = 0.1 }) => clearUndefined({
    elevation: elevation,
    shadowColor: color,
    shadowRadius: radius,
    shadowOffset: {
      width: 3,
      height: 5,
    },
    shadowOpacity: opacity,
  })
})
