import { COLORS } from './colors'
export type ColorName = keyof typeof COLORS
export const AppColor = (nameColor: ColorName) => {
  if (COLORS[nameColor]) return COLORS[nameColor]
  return 'blue'
}
