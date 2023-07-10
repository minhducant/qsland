import SRC from './src_require'
export type ImageName = keyof typeof SRC
export const AppImage = (nameImg: ImageName) => {
  return SRC[nameImg]
}
