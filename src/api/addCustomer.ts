import { Image } from 'react-native';
import { extraBodyMedia } from './qsland';
import { AppApiTypeRequest } from './qsland/TypeRequest';
import { getStorage } from '@lib/storage';
import { Log } from '@utils';
import { SettingApp } from '@assets/common';
import { AppURL } from './qsland/url';

export const addCustomer = async ({
  cmt_img_before,
  cmt_img_after,
  ...params
}: AppApiTypeRequest.addCustomer) => {
  var myHeaders = new Headers();
  const token = await getStorage('token');
  const info = await getStorage('info');
  myHeaders.append('info', JSON.stringify(info));
  myHeaders.append('authorization', `Bearer ${token}`);
  var formData = extraBodyMedia(params, { cmt_img_before, cmt_img_after });
  var requestOptions: any = {
    method: 'POST',
    headers: myHeaders,
    body: formData,
    // redirect: 'follow'
  };
  const domain = SettingApp.domain
  return fetch(
    domain + 'app/customer/addCustomer',
    requestOptions,
  )
    .then(response => response.json())
    .then(result => result)
    .catch(error => console.log('error', error));
};
export const updateCustomer = async ({
  cmt_img_before,
  cmt_img_after,
  ...params
}: AppApiTypeRequest.addCustomer) => {
  var myHeaders = new Headers();
  const token = await getStorage('token');
  const info = await getStorage('info');
  myHeaders.append('info', JSON.stringify(info));
  myHeaders.append('authorization', `Bearer ${token}`);
  var formData = extraBodyMedia(params, { cmt_img_before, cmt_img_after });
  var requestOptions: any = {
    method: 'POST',
    headers: myHeaders,
    body: formData,
    // redirect: 'follow'
  };
  const domain = SettingApp.domain
  return fetch(
    domain + 'app/customer/updateCustomer',
    requestOptions,
  )
    .then(response => response.json())
    .then(result => result)
    .catch(error => console.log('error', error));
};

export const sendExplanation = async ({
  image,
  ...params
}: AppApiTypeRequest.sendExplanation) => {
  Log.d('sendExplanation');
  var myHeaders = new Headers();
  const token = await getStorage('token');
  const info = await getStorage('info');
  myHeaders.append('info', JSON.stringify(info));
  myHeaders.append('authorization', `Bearer ${token}`);
  myHeaders.append('Content-Type', 'multipart/form-data');
  var formData = extraBodyMedia(params, { image });
  Log.d('fromdata', formData);
  var requestOptions: any = {
    method: 'POST',
    headers: myHeaders,
    body: formData,
  };
  Log.d('fromdata', formData);
  const domain = SettingApp.domain
  Log.d('domain', domain);
  return fetch(
    domain + AppURL.Customer.sendExplanation,
    requestOptions,
  )
    .then(response => response.json())
    .then(result => {
      // Log.d('res',result)
      return result;
    })
    .catch(error => console.log('error', error));
};
