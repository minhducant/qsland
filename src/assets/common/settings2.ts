import Device from 'react-native-device-info'

import { Log } from '@utils'
import { getStorage, setStorage } from '@lib/storage'
import { Platform } from 'react-native'
import getValue from 'react-native-get-values';

import { isString } from 'underscore';

export class SettingApp {
    static bundleId = 'qsland'
    static domain = "https://devapi.qsland.s-tech.info/"
    static langue = "VI"
    static typeVersion = "version"
    static device = ""
    static os = ""
    static osVersion = ""
    static deviceName = ""
    static nativeVersion = ""
    static asyncSetting = async () => {
        Log.d('asyncSetting')
        const CodePushKey = await getValue('CodePushDeploymentKey');
        Log.d('CodePushKey', CodePushKey)
        Log.d('KEY-new', CodePushDeploymentKey[Platform.OS][CodePushKey]?.value)
        let KEY = CodePushDeploymentKey[Platform.OS][CodePushKey]?.value ?? "_DEV_.DEV"
        Log.d('asyncSetting', KEY)
        if (isString(KEY)) {
            this.typeVersion = KEY.split('.')[1]
            this.domain = Domain[KEY.split('.')[0]]
        }
        this.device = Device.getDeviceId()
        this.os = Platform.OS
        this.osVersion = Device.getSystemVersion()
        this.deviceName = Device.getDeviceId()
        this.nativeVersion = Device.getVersion()
        this.bundleId = Device.getBuildNumber()
        //
        let _langue = await getStorage('LANGUE')
        if (_langue) this.langue = _langue

    }
    static setLangue = async (_langue: string) => {
        this.langue = _langue
        setStorage('LANGUE', _langue)
    }
}
export const KeyAndroid: any = {
    ['NpR1hJG2S9jCLPSgygtXDlLZCdhyRUmoFQe6G']: { value: '_DEV_.Dev' },
    ['moHdQSr2tlBBk6jl-YM9cizzd0q5MdR-P2Ovx']: { value: '_DEV_.Alpha' },
    ['Ul-WqPPw1gpzloAcWRfX5SAM_501KFAKjBcve']: { value: '_PRO_.Beta' },
    ['F-smrXwSwvBIAXiMIncrvNnJAxKM_Zs_Z1pBn']: { value: '_PRO_.Pro' },
}
export const KeyIos: any = {
    ['zEjbG8H_pDKQFbdUnaili7wZbWIJ6BOjSiwN_']: { value: '_DEV_.Dev' },
    ['rQlVXQk3m4472d4OzUsVoQmTgjrlX3msmNqsC']: { value: '_DEV_.Alpha' },
    ['ipAeKdewsRV0ppyFH40hIil4DUgxCX4RLma9i']: { value: '_PRO_.Beta' },
    ['yMhLPzyDMMU3hrKjmS-1qictoIdfSUetnFlNv']: { value: '_PRO_.Pro' },
}
export const Domain: any = {
    _DEV_: 'https://devapi.qsland.s-tech.info/',
    _PRO_: 'https://boadmin.qsland.vn/',
}
export const CodePushDeploymentKey: any = {
    android: KeyAndroid,
    ios: KeyIos
}