import { client } from '@api/client';
import { isArray, isObject } from 'underscore';
import { Platform } from 'react-native';
import { decodeJson } from '@utils/array';
import { ToastAppError } from '@components/Toast';
import { Log } from '@utils';
export const headersPost = {
  formData: { headers: { 'Content-Type': 'multipart/form-data' } }
}
export class AppResponse {
  response: any = false;
  constructor(response: any) {
    this.response = response;
  }
  getResponse() {
    if (this.response) {
      return this.response;
    }
    return null;
  }
  /**
   *
   * @param type
   * @returns
   */
  getData(type?: 'object' | 'array') {
    if (type) {
      if (type === 'array') {
        if (isArray(this.response?.data)) return this.response.data;
        return [];
      }
      if (type === 'object') {
        if (isObject(this.response?.data)) return this.response.data;
        return {};
      }
    }
    if (this.response?.data) return this.response.data;
    return null;
  }
  check() {
    if (this.response) {
      if (this.response?.status !== true) {
        ToastAppError(this.response.mess);
        return false;
      }
      return this.response.data;
    }
    // alert(JSON.stringify({ response: this.response }))
    return false;
  }
}

export const decodeParams = (body: any) => {
  if (Object.keys(body).length == 0) return '';
  let length = Object.keys(body).length;
  let query = '?';
  Object.keys(body).map((key: string, index) => {
    if (body[key] || body[key] == 0 || body[key] == '') {
      // console.log('sssss', body[key])
      if (isArray(body[key]))
        query +=
          `${key}=${encodeURIComponent(JSON.stringify(body[key]))}` +
          (index + 1 != length ? '&' : '');
      else
        query +=
          `${key}=${encodeURIComponent(body[key])}` +
          (index + 1 != length ? '&' : '');
    }
  });
  return query;
};
export const extraParams = (body: any) => {
  if (Object.keys(body).length == 0) return '';
  let length = Object.keys(body).length;
  let query = '?';
  Object.keys(body).map((key: string, index) => {
    if (body[key] || body[key] == 0 || body[key] == '') {
      // console.log('sssss', body[key])
      if (isArray(body[key]))
        query +=
          `${key}=${encodeURIComponent(JSON.stringify(body[key]))}` +
          (index + 1 != length ? '&' : '');
      else
        query +=
          `${key}=${encodeURIComponent(body[key])}` +
          (index + 1 != length ? '&' : '');
    }
  });
  return query;
};
export const extraBody = (body: any = {}, media: any, file = 'file') => {
  const data = new FormData();
  if (isArray(media)) {
    media.forEach((item: any) => {
      data.append(file, {
        name: item?.fileName,
        type: item?.type,
        uri:
          Platform.OS === 'ios' ? item?.uri.replace('file://', '') : item?.uri,
      });
    });
    for (let index = 0; index < media.length; index++) { }
  } else if (isObject(media))
    data.append(file, {
      name: media?.fileName,
      type: media?.type,
      uri: Platform.OS === 'ios' ? media.uri.replace('file://', '') : media.uri,
    });
  Object.keys(body).forEach(key => {
    if (body[key] && typeof body[key] === 'object') {
      // console.log('body[object]', body[key])
      data.append(key, JSON.stringify(body[key]));
    } else if (body[key] || body[key] === 0) {
      // console.log('body[key]', body[key])
      data.append(key, body[key]);
    }
  });

  return data;
};
export const postData = (url, data, isUpload = false) => {
  if (isUpload) {
    const { file, ...params } = data;
    data = extraBody(params, file);
  } else data = convertData(data);
  return client.post(
    url,
    data,
    isUpload ? { headers: { 'Content-Type': 'multipart/form-data' } } : {},
  );
};
export const convertData = (body = {}) => {
  Object.keys(body).forEach(key => {
    if (typeof body[key] === 'object') body[key] = JSON.stringify(body[key]);
  });
  return body;
};
export const extraArrayJson = (data: any, keys: string[] = []) => {
  if (isArray(data)) {
    return data.map((item, index) => {
      let temp = { ...item };
      keys.forEach(i => {
        temp[i] = decodeJson(item[i]);
      });
      return temp;
    });
  }
};
export const extraObjectJson = (data: any, keys: string[] = []) => {
  if (isObject(data)) {
    let temp = { ...data };
    keys.forEach(i => {
      temp[i] = decodeJson(data[i]);
    });
    return temp;
  }
};
export const convertArrayField = (data: any, keys = {}) => {
  if (isArray(data)) {
    return data.map((item, index) => {
      let temp = { ...item };
      Object.entries(keys).forEach(([key_old, key_new]: any) => {
        temp[key_new] = temp[key_old]
      });
      return temp;
    });
  }
};
/**dsahdksajudhlasikudghlasikudghaskudg */
export const extraBodyMedia = (body: any = {}, media = {}) => {
  Log.d('extraBodyMedia', media)
  /**
   * media:{
   * 
   * field:{uri}
   * field:[{uri}]
   * }
   */
  try {

    const form = new FormData();
    if (isObject(media)) {
      Object.keys(media).forEach(field => {
        /*******forearch media */
        let data = media[field];
        /******array */
        if (isArray(data)) {
          data.forEach(file => {
            form.append(field, {
              name: file?.name ?? file?.fileName ?? 'noname',
              type: file?.type ?? "image/jpg",
              size: file?.fileSize,
              uri: Platform.OS === 'ios' ? file?.uri.replace('file://', '') : file?.uri,
            })
          })
        }
        /******object */
        else if (isObject(data)) {
          form.append(field, {
            name: data?.name ?? data?.fileName ?? 'noname',
            type: data?.type ?? "image/jpg",
            size: data?.fileSize,
            uri: Platform.OS === 'ios' ? data?.uri.replace('file://', '') : data?.uri,
          })
        }
      });
    }
    Object.keys(body).forEach(key => {
      if (body[key] && typeof body[key] === 'object') {
        form.append(key, JSON.stringify(body[key]));
      } else if (body[key] || body[key] === 0) {
        form.append(key, body[key]);
      }
    });
    Log.d('extraBodyMedia-form', form)
    return form;
  } catch (error) {
    Log.d('extraBodyMedia-error', error)
  }
};
export * from './DenyAdminApi'
export * from './AuthApi'
export * from './CustomerApi'
export * from './StaticApi'
export * from './CommonApi'
export * from './ProjectApi'
export * from './TransactionApi'
export * from './BookingApi'
export * from './NewsApi'

