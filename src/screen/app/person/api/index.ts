import { isJson, Log } from "@utils/index"
import { newHookArray } from "@utils/type/core"
import { isArray, isString } from 'underscore';
import { AppImage } from '@assets/image';


export const getImageAvatar = (data: any) => {

  if (isJson(data)) {
    let newData = JSON.parse(data)
    if (isArray(newData)) {
      if (newData.length > 0) {
        let imagesString = newData[0]
        return { uri: imagesString }
      } else { return AppImage('logo_bg1') }
    }
  }
  if (isString(data) && data !== "") return { uri: data }
  return AppImage('logo_bg1')
}