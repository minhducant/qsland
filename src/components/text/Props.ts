import React from 'react'
import { TextProps } from 'react-native'
import { LangName } from '@assets/langs'
import { ColorName } from '@assets/colors'
type B = boolean
type N = number
type S = string
interface PropsParent {
    children?: React.ReactNode
    bold?: B | S
    center?: B
    italic?: B
    underline?: B
    size?: N | Array<size>
    color?: S | Array<ColorName>
    toUpperCase?: B
    toLowerCase?: B
    flex1?: B; flex2?: B; flex3?: B; flex4?: B; flex5?: B; flex6?: B; flex7?: B; flex8?: B; flex9?: B;
    background?: S | Array<ColorName>
}
export interface Props extends TextProps, PropsParent {
    backgroundColor?: S//old
    colorW?: B//old
    colorP?: B//old
    colorR?: B//old
    UPPER?: B//old
    lower?: B//old
    size12?: B//old
    size14?: B//old
    size16?: B//old
    size18?: B//old
    size20?: B//old
    size22?: B//old
    //
    primary?: B
    white?: B
    red?: B
    blue?: B
    green?: B
    yellow?: B
    pink?: B
    gray?: B
    black?: B
    /** Lang in file VI/EN */
    lang?: LangName
}
type color = '#ddd' | '#fff' | '#eee' | '#000' | 'white' | 'blue' | 'green' | 'pink' | 'yellow' | "white" | 'black' | 'blue'
type size = 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24 | 25